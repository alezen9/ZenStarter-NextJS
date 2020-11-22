import { useState, useCallback, useMemo, useEffect, useRef } from "react"
import { get, chunk } from 'lodash'
import { OptionType } from "@_components/FormikInput"
import axios from 'axios'

export const useScrollToTopOnMount = () => {
  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }, [])
}

export const useIsMounted = () => {
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  return isMounted
}

export const usePrevious = (value: any) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

export const useFrontendPagination = (list: any = [], limit: number = 10) => {
  const [dataChuncks, setDataChunks] = useState([])
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  
  const totalCount = useMemo(() => list.length , [JSON.stringify(list)])

  useEffect(() => {
    const chunks = chunk(list, limit)
    setDataChunks(chunks)
    setData(get(chunks, '0', []))
  }, [JSON.stringify(list), limit])

  const onChangePage = useCallback(
    (e: any, newPage: number) => {
      setCurrentPage(newPage)
      const newData = get(dataChuncks, newPage - 1, [])
      setData(newData)
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [JSON.stringify(dataChuncks)])

  return {
    limit,
    totalCount,
    currentPage,
    currentChunk: data,
    onChangePage
  }
}


export const useAdminsAsyncSearch = () => {
  const requestSource = useRef(null)
  const isMounted = useIsMounted()

  const searchSomethingOnType = useCallback(
    async (value?: string): Promise<OptionType[]> => {
        if (requestSource.current) requestSource.current.cancel('User input changed.')
        const CancelToken = axios.CancelToken
        const source = CancelToken.source()
        if (isMounted.current) requestSource.current = source
        const cancelToken = source.token
        // do api call passing the cancel token and return the desired options
        return Promise.resolve([])
    }, [])

    return {
      searchSomethingOnType
    }
}