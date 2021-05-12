import { OptionType } from "@_components/FormikInput"
import { useCallback, useEffect, useRef, useState } from "react"
import axios, { CancelTokenSource } from 'axios'
import { apiInstance } from "src/SDK"
import { get, uniqBy } from "lodash"
import { FiltersUser, User } from "src/SDK/Modules/User/types"

export class AsyncSearchHooks {

  useUsersAsyncSearch = (filters: FiltersUser = {}) => {
    const requestSource = useRef<CancelTokenSource>(null)
    const [mounted, setIsMounted] = useState(true)

    useEffect(() => {
      setIsMounted(true)
      return () => {
        setIsMounted(false)
      }
    }, [])

    const searchUsersOnType = useCallback(
      async (value?: string): Promise<OptionType[]> => {
        if (requestSource.current) requestSource.current.cancel('User input changed.')
        const CancelToken = axios.CancelToken
        const source = CancelToken.source()
        if (mounted) requestSource.current = source
        const cancelToken = source.token
        return apiInstance.user.getList({ searchText: value, ...filters }, { cancelToken })
          .then(res => {
            const _opts = uniqBy<User>(get(res, 'paginated', []), '_id')
            const opts = _opts.reduce<OptionType[]>((acc, user) => {
              const { _id, fullName } = user
              acc.push({
                  label: fullName || '-',
                  value: _id
                })
              return acc
            }, [])
          return opts
          })
      }, [])

    return {
      searchUsersOnType
    }
  }
}