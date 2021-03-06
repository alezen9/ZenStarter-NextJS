import React, { useCallback, useEffect, useMemo } from 'react'
import { useConfigStore } from '@_zustand/config'
import { get } from 'lodash'
import { ServerMessage } from '@_utils/serverMessages'
import { ConfigStore } from '@_zustand/config/helpers'
import { LSTheme, LSToken } from '@_utils/LSVariables'
import ZenApp from '@_components/_ZenApp'
import { AppProps } from 'next/app'
import { setLocale } from 'yup'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
// css
import 'nprogress/nprogress.css'
import '@_components/_ZenMenu/MobileMenu/Navbar/Navbar.css'
import '@_components/AnimatedSuccess/Success.css'
// random icon
import AcUnitRoundedIcon from '@material-ui/icons/AcUnitRounded'
// REDUX
import { Provider } from 'react-redux'
import { store } from 'src/_redux'


setLocale({
   mixed: {
      notType: ({ path, type, value, originalValue }) => {
         if (['string', 'number'].includes(type)) return 'Input non valido'
      },
      required: 'Campo obbligatorio',
   },
   string: {
      email: () => 'Inserire una email valida'
   }
})

const stateSelector = (state: ConfigStore) => ({
   isLoading: state.isLoading,
   openSnackbar: state.openSnackbar
})

const MyApp = (props: AppProps) => {
   const { Component, pageProps } = props
   const { openSnackbar } = useConfigStore(stateSelector)
   const title = useMemo(() => {
      switch (publicRuntimeConfig.ENV) {
         case 'test':
            return 'Test - Zen Next.js starter'
         case 'staging':
            return 'Staging - Zen Next.js starter'
         case 'prod':
            return 'Zen Next.js starter'
         default:
            return 'Zen Next.js starter'
      }
   }, [publicRuntimeConfig.ENV])

   const onError = useCallback(
      (error, key, config) => {
         openSnackbar({
            variant: 'error',
            message: ServerMessage[error] || get(error, 'message', error)
         })
      }, [openSnackbar])

   return (
      <>
         <Provider store={store}>
            <ZenApp
               title={title}
               LSVariables={{ LSTheme, LSToken }}
               swrConfig={{ onError }}
               SplashscreenIcon={<AcUnitRoundedIcon style={{ fontSize: '6em' }} />}>
               <Component {...pageProps} />
            </ZenApp>
         </Provider>
      </>
   )
}

export default React.memo(MyApp)
