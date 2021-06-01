import React, { useCallback, useMemo } from 'react'
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
import '@_components/AnimatedSuccess/Success.css'
// random icon
import AcUnitRoundedIcon from '@material-ui/icons/AcUnitRounded'


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
         case 'staging':
            return 'Staging - Quaestiones'
         case 'prod':
            return 'Quaestiones'
         default:
            return 'Quaestiones'
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
      <ZenApp
         title={title}
         LSVariables={{ LSTheme, LSToken }}
         swrConfig={{ onError }}
         SplashscreenIcon={<AcUnitRoundedIcon style={{ fontSize: '6em' }} />}>
         <Component {...pageProps} />
      </ZenApp>
   )
}

export default React.memo(MyApp)
