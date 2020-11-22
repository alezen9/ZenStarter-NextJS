import { ZenPalette, ThemeType } from '@_palette'
import create, { UseStore } from 'zustand'
import { _immer, ConfigStore, setSnackbarData } from './helpers'
import { LSTheme } from '@_utils/LSVariables'

export const useConfigStore: UseStore<ConfigStore> = create(_immer((set: any, get: any, api: any) => ({
  themeType: ThemeType.light,
  isLogged: false,
  menuOpen: false,
  isLoading: false,
  pageTitle: 'Dashboard',
  snackbar: { open: false },
  setPageTitle: (title: any) => {
    set((state: ConfigStore) => {
      state.pageTitle = title
    })
  },
  openSnackbar: (data: setSnackbarData) => {
    set((state: ConfigStore) => {
      state.snackbar = { ...data, open: true }
    })
  },
  closeSnackbar: () => {
    set((state: ConfigStore) => {
      state.snackbar = { open: false, message: state.snackbar.message || '', variant: state.snackbar.variant || '' }
    })
  },
  setIsLogged: (bool: boolean) => {
    set((state: ConfigStore) => {
      state.isLogged = bool
    })
  },
  toggleMenu: () => {
    set((state: ConfigStore) => {
      state.menuOpen = !state.menuOpen
    })
  },
  setTheme: (type: ThemeType, onlyType: boolean = false) => {
    set((state: ConfigStore) => {
      state.themeType = type
    })
    if (!onlyType) {
      window.localStorage.setItem(LSTheme, type)
      ZenPalette.switchTheme(type)
    }
  },
  toggleTheme: () => {
    const newType = get().themeType === ThemeType.dark
      ? ThemeType.light
      : ThemeType.dark
    set((state: ConfigStore) => {
      state.themeType = newType
    })
    window.localStorage.setItem(LSTheme, newType)
    ZenPalette.switchTheme(newType)
  },
  setIsLoading: (bool: boolean) => {
    set((state: ConfigStore) => {
      state.isLoading = bool
    })
  }
})))
