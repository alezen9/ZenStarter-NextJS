import { ThemeType } from '@_MUITheme'
import { ZenRoute, ZenRouteID } from '@_utils/routes/types'
import { setSnackbarData } from '@_zustand/helpers'

export type PrevRoute = ZenRoute & {
   exactURL: string // keeps track of the exact url eg: users/4543jhbjhb34j5b34
}

export type ConfigStore = {
	themeType: ThemeType
	isLogged: boolean
	menuOpen: boolean
	isLoading: boolean
	pageTitle: any
   snackbar: any
   activeRoute: ZenRoute
   prevRoute: PrevRoute,
   setActiveRoute: (routeID: ZenRouteID) => void
	setPageTitle: (title: any) => void
	openSnackbar: (data: setSnackbarData) => void
	closeSnackbar: VoidFunction
	setIsLogged: (bool: boolean) => void
	toggleMenu: VoidFunction
	setTheme: (type: ThemeType, onlyType?: boolean) => void
	toggleTheme: VoidFunction
	setIsLoading: (isLoading: boolean) => void
}

export type ConfigStoreSelector = (state: ConfigStore) => Partial<ConfigStore>
