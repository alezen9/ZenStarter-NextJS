import { ConfigStore } from "@_zustand/helpers"
import { Draft } from "immer"
import { isObject } from "lodash"

export enum SwrKey {
  MY_KEYS = 'MY_KEYS',
  MY_KEY = 'MY_KEY'
}


export const stateSelector = (state: ConfigStore) => ({
  setIsLoading: state.setIsLoading
})

const iterateAndAssign = (data, draft, prefix?: string) => {
  for(const [key, val] of Object.entries(data)){
    if(isObject(val)) iterateAndAssign(val, draft, key)
    else draft[`${prefix ? `${prefix}.` : ''}${key}`] = val
  }
}

export const mutateDraft = data => draft => {
  iterateAndAssign(data, draft)
}

export type DirectMutationImmer<T> = ((draft: Draft<T>) => void)|((currentState: Readonly<T>, draft: Draft<T>) => void)

export interface MoreOptions {
  fromCache?: boolean
  initialData?: any
  revalidateOnFocus?: boolean
  revalidateOnMount?: boolean
  shouldRetryOnError?: boolean
}