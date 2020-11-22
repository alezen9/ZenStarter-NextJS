import useSWR, { cache, trigger, mutate as mutateCache } from 'swr'
import { useConfigStore } from '@_zustand/configStore'
import { useEffect, useCallback, useState } from 'react'
import { get } from 'lodash'
import { apiInstance } from 'src/SDK'
import { MoreOptions, stateSelector, SwrKey } from '@_swr/helpers'
import swrExampleFetchers from './fetchers'

interface ExampleMoreOptions extends MoreOptions {
   filters?: object
}

export const useSWRExamples = <T extends ExampleMoreOptions>(options?: T) => {
  const { filters = {}, ...restOfOpts } = options || {}
  const hasToken = apiInstance.hasToken()
  const { setIsLoading } = useConfigStore(stateSelector)
  const filtersKey = JSON.stringify(filters)
  const { data, isValidating } = useSWR(
    [SwrKey.MY_KEYS, filtersKey],
    swrExampleFetchers.multipleItems,
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
      return trigger([SwrKey.MY_KEYS], shouldRevalidate)
    }, [trigger])


  return {
    list: data,
    totalCount: data.length, // get total count from backend
    trigger: triggerThis,
    isValidating
  }
}

export const useSWRExample = <T extends MoreOptions>(_id: string|null|undefined, options?: T) => {
  const { fromCache = true, ...restOfOpts } = options || {}
  const hasToken = apiInstance.hasToken()
  const { setIsLoading } = useConfigStore(stateSelector)
  const initialData = fromCache
    ? cache.get([SwrKey.MY_KEY, _id])
    : undefined
  const [revalidateOnMount, setRevalidateOnMount] = useState(fromCache && initialData ? false : hasToken)
  const { data, mutate, isValidating } = useSWR(
    [SwrKey.MY_KEY, _id],
    swrExampleFetchers.singleItem,
    {
      initialData,
      revalidateOnMount,
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      ...restOfOpts || {}
    }
  )

  useEffect(() => {
    if(get(data, '_id', null) && !revalidateOnMount) setRevalidateOnMount(hasToken)
  }, [get(data, '_id', null), revalidateOnMount, hasToken])

  useEffect(() => {
    setIsLoading(isValidating)
  }, [isValidating])

  const triggerThis = useCallback(
    (shouldRevalidate: boolean = true): Promise<any> => {
      return trigger([SwrKey.MY_KEY, _id], shouldRevalidate)
    }, [trigger])

  return {
    item: data,
    trigger: triggerThis
  }
}