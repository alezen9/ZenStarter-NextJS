import { ThemeType } from "@_palette"
import { useConfigStore } from "@_zustand/configStore"
import { ConfigStore } from "@_zustand/helpers"
import { get, isEmpty } from "lodash"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { cleanQueryParams } from "./helpers"

type ThemeConfig = {
  lightColor?: string
  darkColor?: string
  LSTheme: string
}

const stateSelectorTheme = (state: ConfigStore) => ({
  themeType: state.themeType,
  setTheme: state.setTheme
})

export const useWithThemeSwitch = (config: ThemeConfig) => {
  const { lightColor = '#fafafa', darkColor = '#111', LSTheme } = config
  const { themeType, setTheme } = useConfigStore(stateSelectorTheme)

  useEffect(() => {
    const _themeType: ThemeType = window && window.localStorage && window.localStorage.getItem(LSTheme)
      ? window.localStorage.getItem(LSTheme) as ThemeType
      : ThemeType.light
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

type AuthConfig = {
   AS_PATH: string
   LSToken: string
}

const rawParams = /\/+\[+[a-zA-Z0-9]+\]+\/?/gmi

const stateSelectorAuth = (state: ConfigStore) => state.setIsLogged

export const useWithAuthentication = (config: AuthConfig) => {
   const { AS_PATH, LSToken } = config
   const [isFirstRun, setFirstRun] = useState(true)
   const router = useRouter()
   const setIsLogged = useConfigStore(stateSelectorAuth)
   
   useEffect(() => {
    if (!isEmpty(cleanQueryParams(router.query))) {
      window.localStorage.setItem(AS_PATH, router.asPath)
    }
  }, [router.query])

  useEffect(() => {
    router.prefetch('/login')
    router.prefetch('/')
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles)
    const isLogged: any = window && window.localStorage
      ? window.localStorage.getItem(LSToken)
      : false
    setIsLogged(!!isLogged)
    const path: string = isLogged
      ? /\/login/.test(router.pathname)
        ? '/'
        : router.pathname || '/'
      : '/login'
    const asPath: string|null = isLogged ? window.localStorage.getItem(AS_PATH) : null
    const origin = asPath 
      ? get(asPath.split('?'), '0', '')
      : ''
    const params: string = asPath && origin === router.pathname
      ? get(asPath.split('?'), '1', '')
      : ''
    if (asPath && rawParams.test(router.pathname)) {
      router.replace(path, asPath)
        .then(() => setFirstRun(false))
    } else {
      router.replace(`${path}${params ? `?${params}` : ''}`)
        .then(() => setFirstRun(false))
    }
  }, [LSToken, AS_PATH])

  return {
     isFirstRun
  }
}