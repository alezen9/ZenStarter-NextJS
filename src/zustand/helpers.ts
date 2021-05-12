import produce from 'immer'
import { ReactNode } from 'react'
import { State, StateCreator } from 'zustand'

export const _immer = <T extends State>(config: StateCreator<T, (fn: (draft: T) => void) => void>): StateCreator<T> => (
	set,
	get,
	api
) => config(fn => set(produce(fn) as (state: T) => T), get, api)

export type setSnackbarData = {
	variant?: 'error' | 'success' | 'warning' | 'info'
	message?: ReactNode
}

export type SnackbarData = setSnackbarData & {
	open: boolean
}

export type OpenSnackbarFn = (data: setSnackbarData) => void
