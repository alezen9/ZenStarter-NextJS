import useSWR, { trigger } from 'swr'
import { useConfigStore } from '@_zustand/config'
import { useEffect, useCallback } from 'react'
import { get, set } from 'lodash'
import { apiInstance } from 'src/SDK'
import { getChangedValues, MoreOptions, MutateListImmer, stateSelector, SwrKey } from '@_swr/helpers'
import swrUserFetchers from './fetchers'
import { ServerMessage } from '@_utils/serverMessages'
import produce from 'immer'
import { FiltersUser, User } from 'src/SDK/Modules/User/types'

interface UsersMoreOptions extends MoreOptions {
   filters?: FiltersUser
}

export const useSWRUsers= <T extends UsersMoreOptions>(options?: T) => {
  const { filters = {}, ...restOfOpts } = options || {}
  const hasToken = apiInstance.auth.hasToken()
  const filtersKey = JSON.stringify(filters)
  const { setIsLoading, openSnackbar } = useConfigStore(stateSelector)
  
  const { data, isValidating, mutate } = useSWR(
    [SwrKey.USERS, filtersKey], // => keys
    swrUserFetchers.usersFetcher,
    {
      revalidateOnMount: hasToken,
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      ...restOfOpts || {}
    }
  )

  useEffect(() => {
    setIsLoading(isValidating)
  }, [isValidating])

  const triggerThis = useCallback(
    (shouldRevalidate: boolean = true): Promise<any> => {
      return trigger([SwrKey.USERS, filtersKey], shouldRevalidate)
    }, [trigger, filtersKey])

  const mutateThis = useCallback(
    (data: MutateListImmer<User>, shouldRevalidate: boolean = false) => {
      return mutate(produce(data), shouldRevalidate)
  }, [mutate])

  // ESEMPIO
  const inviteUser = useCallback((_id: string) => async () => {
    try {
      setIsLoading(true)
      const result = await apiInstance.user.invite(_id)
      if(!result) throw new Error()
      openSnackbar({
        variant: 'success',
        message: 'Invito inviato con successo!'
      })
      // modifica non invasiva => posso aggiornare la cache senza richiedere tutta la lista al backend
      mutateThis(draft => {
        const data = get(draft, 'paginated', []) as User[]
        const idx = data.findIndex(user => user._id === _id)
        const stato = get(draft, `paginated.${idx}.stato`, 3)
        set(draft, `paginated.${idx}.stato`, stato === 3 ? 0 : stato)
      })
      setIsLoading(false)
      return true
    } catch (error) {
      setIsLoading(false)
      openSnackbar({
        variant: 'error',
        message: get(error, 'message', ServerMessage.generic)
      })
      return false
    }
  }, [setIsLoading, mutateThis, openSnackbar])

  return {
    list: get(data, 'paginated', []),
    totalCount: get(data, 'totalCount', 0),
    trigger: triggerThis,
    isValidating,
    inviteUser
  }
}