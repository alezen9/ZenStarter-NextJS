import React, { ReactChild, ReactChildren, ReactNode, useCallback, useEffect, useMemo, useRef } from 'react'
import { CssBaseline, ThemeProvider, Snackbar, makeStyles, useTheme, useMediaQuery } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { Offline, Online } from 'react-detect-offline'
import OfflinePage from '@_components/Offline'
import Head from 'next/head'
import Title from '@_components/Title'
import ProgressBar from '@_components/ProgressBar'
import { useConfigStore } from '@_zustand/config'
import { SWRConfiguration, SWRConfig } from 'swr'
import dynamic from 'next/dynamic'
import { ConfigStore } from '@_zustand/config/helpers'
import SplashScreen from './SplashScreen'
import ZenMenu from '@_components/_ZenMenu'
import zenHooks from '@_utils/hooks'
import { ThemeType, DarkTheme, LightTheme } from '@_MUITheme'
const NProgress = dynamic(() => import("@_components/NProgress"), { ssr: false })

const useStyles = makeStyles(theme => ({
   snackbar: {
      [theme.breakpoints.down('xs')]: {
         bottom: 85
      }
   },
   rootAlert: {
      display: 'flex',
      alignItems: 'center',
      ...theme.type === ThemeType.dark && {
         filter: 'saturate(.8)'
      },
      [theme.breakpoints.down('xs')]: {
         width: '100%'
      }
   },
   alertMessage: {
      padding: 0,
      fontSize: '11pt',
      display: '-webkit-box',
      WebkitLineClamp: 1,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      [theme.breakpoints.down('xs')]: {
         width: '100%'
      }
   },
   content: {
      width: '100%',
      overflow: 'hidden auto',
      minHeight: '100vh',
      padding: '1.5em',
      transition: 'width .2s ease',
      [theme.breakpoints.down('sm')]: {
         position: 'relative',
         marginTop: '5em',
         width: '100vw !important',
         padding: '1em 1em 90px 1em'
      }
   },
   wrapper: {
      display: 'flex',
      width: '100vw',
      minHeight: '100vh',
      overflow: 'hidden auto'
   }
}))

const Alert = props => {
   const { rootAlert, alertMessage } = useStyles()
   return <MuiAlert
      classes={{
         root: rootAlert,
         message: alertMessage
      }}
      elevation={6}
      variant='filled'
      {...props}
   />
}

const stateSelector = (state: ConfigStore) => ({
   themeType: state.themeType,
   isLogged: state.isLogged,
   menuOpen: state.menuOpen,
   isLoading: state.isLoading,
   snackbar: state.snackbar,
   closeSnackbar: state.closeSnackbar,
   openSnackbar: state.openSnackbar,
})

type LSVariables = {
   LSToken: string
   LSTheme: string
}

type Props = {
   children: ReactChild | ReactChildren
   title: string
   SplashscreenIcon: ReactNode
   LSVariables: LSVariables
   swrConfig?: SWRConfiguration
}

const ZenApp = (props: Props) => {
   const { children, title, SplashscreenIcon, LSVariables: { LSTheme, LSToken }, swrConfig } = props
   const { themeType, menuOpen, isLogged, isLoading, snackbar, closeSnackbar } = useConfigStore(stateSelector)
   const classes = useStyles({ menuOpen, isLogged })
   const _theme = useTheme()
   const isSmallScreen = useMediaQuery(_theme.breakpoints.down('sm'))
   const theme = useMemo(() => themeType === ThemeType.light ? LightTheme : DarkTheme, [themeType])

   const { isFirstRun } = zenHooks.app.useInitWithAuthentication({ LSToken })
   zenHooks.app.useWithThemeSwitch({ LSTheme })
   const isPrivateRoute = zenHooks.app.useIsPrivateRoute()

   const handleClose = useCallback((e, reason) => {
      if (reason === 'clickaway') return
      closeSnackbar()
   }, [closeSnackbar])

   return (
      <>
         <Head>
            <meta name='viewport' content='width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0' />
            <title>{title}</title>
         </Head>
         <ThemeProvider theme={theme}>
            <Online>
               <CssBaseline />
               {isFirstRun
                  ? <SplashScreen icon={SplashscreenIcon} />
                  : <div className={classes.wrapper}>
                     {isLoading && !isSmallScreen ? <ProgressBar /> : <NProgress />}
                     {isLogged && isPrivateRoute && <ZenMenu />}
                     <div {...isLogged && { className: classes.content }}>
                        {isLogged && isPrivateRoute && <Title />}
                        {swrConfig
                           ? <SWRConfig value={swrConfig} >
                              {children}
                           </SWRConfig>
                           : children}
                     </div>
                  </div>}
               <Snackbar
                  className={classes.snackbar}
                  anchorOrigin={{
                     vertical: 'bottom',
                     horizontal: 'left'
                  }}
                  onClose={handleClose}
                  autoHideDuration={3000}
                  open={snackbar.open}>
                  <Alert
                     onClose={handleClose}
                     severity={snackbar.variant}>
                     {snackbar.message}
                  </Alert>
               </Snackbar>
            </Online>
            <Offline>
               <OfflinePage />
            </Offline>
         </ThemeProvider>
      </>
   )
}

export default ZenApp
