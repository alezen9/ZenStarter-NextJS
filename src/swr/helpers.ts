import { ConfigStore } from "@_zustand/config/helpers"
import { Draft } from "immer"
import { reduce } from "lodash"
import { ListResponse } from "src/SDK/types"

export enum SwrKey {
  USERS = 'USERS',
  USER = 'USER'
}


export const stateSelector = (state: ConfigStore) => ({
  setIsLoading: state.setIsLoading,
  openSnackbar: state.openSnackbar
})

export type MutateListImmer<T> = (draft: Draft<ListResponse<T>>) => void
export type DirectMutationImmer<T> = (draft: Draft<T>) => void

export interface MoreOptions {
  fromCache?: boolean
  initialData?: any
  revalidateOnFocus?: boolean
  revalidateOnMount?: boolean
  shouldRetryOnError?: boolean
}

export interface ListOf<T> {
    totalCount: number,
    result: T[],
    currentCount: number|undefined
}

export const getChangedValues = (newVals, oldVals) => {
  const filteredValues = reduce(newVals, (acc, value, key) => {
    if(/^(ignoreField_)/.test(key)) return acc // campi da ignorare
    if (key !== '_id' && (['', undefined, null].includes(value) || value === oldVals[key])) return acc // ignoro campo vuoto o invariato che non sia _id (l'_id se c'è mi serve anche se invariato ovviamente)
    return {
      ...acc,
      [key]: value
    }
  }, {})
  return filteredValues
}
