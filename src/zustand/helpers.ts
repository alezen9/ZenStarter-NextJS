import { ThemeType } from '@_palette'
import produce from 'immer'
import { State, StateCreator } from 'zustand'

export const _immer = <T extends State>(
  config: StateCreator<T, (fn: (draft: T) => void) => void>
): StateCreator<T> => (set, get, api) =>
  config((fn) => set(produce(fn) as (state: T) => T), get, api)


export type ConfigStore = {
    themeType: ThemeType
    isLogged: boolean
    menuOpen: boolean
    isLoading: boolean
    pageTitle: any
    snackbar: any
    setPageTitle: (title: any) => void
    openSnackbar: (data: setSnackbarData) => void
    closeSnackbar: VoidFunction
    setIsLogged: (bool: boolean) => void
    toggleMenu: VoidFunction
    setTheme: (type: ThemeType, onlyType?: boolean) => void
    toggleTheme: VoidFunction
    setIsLoading: (isLoading: boolean) => void
}

export type setSnackbarData = {
    variant?: 'error'|'success'|'warning'
    message?: string
}

export type SnackbarData = setSnackbarData & {
    open: boolean
}