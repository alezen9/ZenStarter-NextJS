import { makeStyles } from '@material-ui/core'
import { ZenPalette } from '@_MUITheme'
import { ConfigStore } from '@_zustand/config/helpers'

export const useSharedStyles = makeStyles(theme => ({
	main: {
		width: '100vw',
		minHeight: '100vh',
		padding: `${theme.spacing(5)}px 0`
   },
	form: {
		width: '100%',
		maxWidth: 300,
      margin: theme.spacing(1, 'auto')
   },
   formRegister: {
		width: '100%',
		maxWidth: 550,
      marginTop: theme.spacing(2.5),
      '& > div > div': {
         paddingTop: '0 !important',
         paddingBottom: '0 !important'
      },
      [theme.breakpoints.down('xs')]: {
         maxWidth: 300
      }
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
   link: (props: any) => ({
      color: ZenPalette.typographyGrey,
      margin: 'auto',
      ...props.isSubmitting && {
         opacity: 0.5,
         pointerEvents: 'none'
      }
   }),
	logo: {
      zIndex: -1,
		position: 'fixed',
		bottom: '-40vh',
		left: '-10vw',
		fontSize: '50em',
		transform: 'rotateZ(-30deg)',
		opacity: '.05',
		color: '#005959',
		[theme.breakpoints.down('xs')]: {
			bottom: '-50vh',
			fontSize: '45em'
		}
	},
	themeToggleClass: {
		position: 'absolute',
		top: '1.5em',
		right: '1.5em'
	}
}))

export const stateSelector = (state: ConfigStore) => ({
	isLogged: state.isLogged,
	openSnackbar: state.openSnackbar,
	setIsLogged: state.setIsLogged,
	setIsLoading: state.setIsLoading,
	themeType: state.themeType
})
