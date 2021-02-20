import React, { useCallback, useEffect } from 'react'
import { useConfigStore } from '@_zustand/config'
import { get } from 'lodash'
import { ServerMessage } from '@_utils/serverMessages'
import { ConfigStore } from '@_zustand/config/helpers'
import { AS_PATH, LSTheme, LSToken } from '@_utils/LSVariables'
import ZenApp from '@_components/_ZenApp'
import { AppProps } from 'next/app'
import { apiInstance } from 'src/SDK'
import { setLocale } from 'yup'
import AcUnitRoundedIcon from '@material-ui/icons/AcUnitRounded'
// css
import 'nprogress/nprogress.css'
import '@_components/_ZenMenu/MobileMenu/Navbar/Navbar.css'
import '@_components/AnimatedSuccess/Success.css'

// basic yup validations
setLocale({
	mixed: {
		notType: ({ path, type, value, originalValue }) => {
			if (['string', 'number'].includes(type)) return 'Invalid input'
		},
      required: 'Required field',
	}
})

const stateSelector = (state: ConfigStore) => ({
	isLoading: state.isLoading,
	openSnackbar: state.openSnackbar
})

const MyApp = (props: AppProps) => {
	const { Component, pageProps } = props
	const { isLoading, openSnackbar } = useConfigStore(stateSelector)

	// const { item, trigger } = useSWRMe({ revalidateOnMount: false })
	const item = {}
	const trigger = () => {}

	useEffect(() => {
		if (apiInstance.auth.hasToken() && !get(item, '_id', null) && !isLoading) trigger()
	}, [apiInstance.auth.hasToken(), get(item, '_id', null), isLoading])

	const onError = useCallback(
		(error, key, config) => {
			openSnackbar({
				variant: 'error',
				message: ServerMessage[error] || get(error, 'message', error)
			})
		},
		[openSnackbar]
	)

	return (
		<>
			<ZenApp
				title='Zen starter'
				LSVariables={{ AS_PATH, LSTheme, LSToken }}
				swrConfig={{ onError }}
				SplashscreenIcon={<AcUnitRoundedIcon style={{ fontSize: '6em' }} />}>
				<Component {...pageProps} />
			</ZenApp>
		</>
	)
}

export default React.memo(MyApp)
