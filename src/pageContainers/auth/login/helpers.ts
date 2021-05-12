import { ServerMessage } from '@_utils/serverMessages'
import { FormikHelpers } from 'formik'
import { apiInstance } from 'src/SDK'
import { get } from 'lodash'
import * as yup from 'yup'
import { LoginInput } from 'src/SDK/Modules/Auth/types'

export const onLogin = ({ openSnackbar, setIsLoading, setIsLogged, goToHome }) => async (
	values: LoginInput,
	helpers: FormikHelpers<any>
) => {
	setIsLoading(true)
	helpers.setSubmitting(true)
	try {
		const { token } = await apiInstance.auth.login(values)
		if (token) {
			apiInstance.auth.setToken(token)
			setIsLogged(true)
			goToHome()
		}
	} catch (error) {
		openSnackbar({
			variant: 'error',
			message: get(ServerMessage, error, 'Username o password errate!')
		})
	}
	setIsLoading(false)
	helpers.setSubmitting(false)
}

export const schema = yup.object().shape({
	username: yup.string().required(),
	password: yup.string().required()
})
