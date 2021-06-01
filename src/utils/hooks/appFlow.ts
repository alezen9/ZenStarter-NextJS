import { INITIAL_THEME_TYPE, ThemeType } from '@_MUITheme'
import { routesPaths } from '@_utils/routes'
import { publicRoutes } from '@_utils/routes/Public'
import { ZenRouteID } from '@_utils/routes/types'
import { useConfigStore } from '@_zustand/config'
import { ConfigStoreSelector } from '@_zustand/config/helpers'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { apiInstance } from 'src/SDK'
import zenHooks from '.'

type ThemeConfig = {
	lightColor?: string
	darkColor?: string
	LSTheme: string
}

type AuthConfig = {
	LSToken: string
}

type ZenRouteIDS = ZenRouteID.HOME|ZenRouteID.LOGIN // HOME + routes come ad esempio login, sign up
const publicRoutesIDS: ZenRouteID[] = publicRoutes.map(({ _id }) => _id)

export class ZenAppFlowHooks {
   #stateSelectorTheme: ConfigStoreSelector // to manage theme
   #stateSelectorAuth: ConfigStoreSelector // to manage auth
   #stateSelectorSetActiveRoute: ConfigStoreSelector // to set active route
   #paths: Partial<Record<ZenRouteIDS, string>>

   constructor(){
      this.#stateSelectorTheme = state => ({
         themeType: state.themeType,
         setTheme: state.setTheme
      })
      this.#stateSelectorAuth = state => ({
         setIsLogged: state.setIsLogged,
         isLogged: state.isLogged,
         activeRoute: state.activeRoute
      })
      this.#stateSelectorSetActiveRoute = state => ({
         setActiveRoute: state.setActiveRoute
      })
      this.#paths = {
         [ZenRouteID.HOME]: routesPaths[ZenRouteID.HOME].path,
         [ZenRouteID.LOGIN]: routesPaths[ZenRouteID.LOGIN].path
      }
   }

   private checkPathType (path: string): { isAuthPath: boolean, isPublicPath: boolean } {
      // see if user is on public route (change only on setup or when adding/removing auth routes)
      const isAuthPath = !!/\/auth\/login/.test(path) // routes dalle quali si vuole reindirizzare l'utente alla home se quest'ultimo è loggato
      const isPublicPath = !!/\/auth\/login/.test(path) // tutte le route pubbliche come login, sign up, o altre che non c'entrano con l'autenticazione ma sono pubbliche
      // es. di route che non c'entra con l'autenticazione ma è pubblica può essere una pagina di download tramite link da email
      return { isAuthPath, isPublicPath }
   }

   useSetActivePage = (routeID: ZenRouteID) => {
      const { setActiveRoute } = useConfigStore(this.#stateSelectorSetActiveRoute)
   
      useEffect(() => {
         setActiveRoute(routeID)
      }, [setActiveRoute, routeID])
   }

   useIsPrivateRoute = (): boolean => {
      const [isPrivate, setIsPrivate] = useState(false)
      const activeRoute = useConfigStore(state => state.activeRoute)
      
      useEffect(() => {
         setIsPrivate(!!activeRoute.isPrivate)
      }, [activeRoute.isPrivate])

      return isPrivate
   }

   useWithThemeSwitch = (config: ThemeConfig) => {
      const { lightColor = '#fafafa', darkColor = '#111', LSTheme } = config
      const { themeType, setTheme } = useConfigStore(this.#stateSelectorTheme)

      useEffect(() => {
         const _themeType: ThemeType =
            window && window.localStorage && window.localStorage.getItem(LSTheme)
               ? (window.localStorage.getItem(LSTheme) as ThemeType)
               : INITIAL_THEME_TYPE
         setTheme(_themeType)
      }, [setTheme, LSTheme])

      useEffect(() => {
         if (process.browser) {
            if (!document.body.style.transition) {
               document.body.style.transition = 'background-color .1s ease'
            }
            document.body.style.backgroundColor = themeType === ThemeType.light 
               ? lightColor 
               : darkColor
         }
      }, [themeType, lightColor, darkColor])
   }

   useInitWithAuthentication = (config: AuthConfig) => {
      const { LSToken } = config
      const [isFirstRun, setFirstRun] = useState(true)
      const [isCheckingToken, setIsCheckingToken] = useState(true)
      const router = useRouter()
      const { setIsLogged, isLogged, activeRoute } = useConfigStore(this.#stateSelectorAuth)
      const isMounted = zenHooks.utils.useIsMounted()
      const isTokenValid = useRef(false)

      useEffect(() => {
         if(!isCheckingToken && isFirstRun) setFirstRun(false)
      }, [isCheckingToken, isFirstRun])

      // make public routes not accessible if user is logged in
      // in questo caso pagine esterne tipo download tramite link da email o simili non funzioneranno
      // bisogna tarare i check in base alle necessità (poca roba)
      useEffect(() => {
         if(!isCheckingToken && isLogged && publicRoutesIDS.includes(activeRoute._id) && activeRoute._id !== ZenRouteID.ERROR) {
            router.replace(this.#paths.HOME)
               .then(() => isMounted.current && setIsCheckingToken(false))
               .catch(() => isMounted.current && setIsCheckingToken(false))
         }
      }, [activeRoute._id, isLogged, isCheckingToken])

      const redirectUser = useCallback(
         (isAuthPath: boolean, isPublicPath: boolean): void => {
            // 1. good token && public => redirect to home
            // 2. bad token && private => redirect login
            // 3. bad token && public => ok
            // 4. good token and private => ok
            if(!isTokenValid.current && !isPublicPath) { /** 2 */
               router.replace(this.#paths.LOGIN)
                  .then(() => isMounted.current && setIsCheckingToken(false))
                  .catch(() => isMounted.current && setIsCheckingToken(false))
            } else if(isTokenValid.current && isPublicPath) { /** 1 */
               router.replace(this.#paths.HOME)
                  .then(() => isMounted.current && setIsCheckingToken(false))
                  .catch(() => isMounted.current && setIsCheckingToken(false))
            } else { /** 3 & 4 */
               isMounted.current && setIsCheckingToken(false)
            }
         }, [])

      // on mount
      useEffect(() => {
         // prefetch main routes
         router.prefetch(this.#paths.LOGIN)
         router.prefetch(this.#paths.HOME)
         // rehydrate app (update server side styles)
         const jssStyles = document.querySelector('#jss-server-side')
         if (jssStyles) jssStyles.parentElement.removeChild(jssStyles)
         // check path type
         const { isAuthPath, isPublicPath } = this.checkPathType(router.pathname)
         // get and check LS token validity
         const token: string = window && window.localStorage 
            ? window.localStorage.getItem(LSToken) 
            : null
         if(!token) {
            isTokenValid.current = false
            setIsLogged(false)
            redirectUser(isAuthPath, isPublicPath)
         } else {
            apiInstance.auth.isTokenValid(token)
               .then(isValid => {
                  if(isMounted.current){
                     isTokenValid.current = isValid
                     setIsLogged(isValid)
                     redirectUser(isAuthPath, isPublicPath)
                  }
               })
               .catch(() => {
                  if(isMounted.current){
                     isTokenValid.current = false
                     setIsLogged(false)
                     redirectUser(isAuthPath, isPublicPath)
                  }
               })
         }
      }, [LSToken])

      return {
         isFirstRun,
         isTokenValid
      }
   }
}
