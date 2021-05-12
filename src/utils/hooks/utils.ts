import { FormikProps } from "formik"
import { chunk, debounce, get } from "lodash"
import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from "react"

export class UtilsHooks {
   usePrevious = <T>(value: T): T => {
      const ref = useRef<T>(null)
      useEffect(() => {
         ref.current = value
      }, [value])
      return ref.current
   }

   useIsMounted = (): MutableRefObject<boolean> => {
      const isMounted = useRef<boolean>(false)
      useEffect(() => {
         isMounted.current = true
         return () => {
            isMounted.current = false
         }
      }, [])
      return isMounted
   }

   useScrollToTopOnMount = () => {
      useEffect(() => {
         window.scrollTo({top: 0, behavior: 'smooth'})
      }, [])
   }

   useFrontendPagination = (list: any = [], limit: number = 10) => {
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

   useDebouncedCallback = (callback, delay: number, deps = []) => {
      const callbackRef = useRef(null)
      callbackRef.current = callback;
      return useCallback(debounce(
         (...args) => callbackRef.current(...args),
         delay,
      ), [...deps])}

   useFieldArray = (params: { name: string, formik: FormikProps<any>, initialValue?: object }) => {
      const { name, formik, initialValue = {} } = params
      const { setFieldValue, setFieldTouched, values } = formik
      const currentValues = useMemo(() => get(values, name, []) || [], [get(values, name, null)])

      const _setFieldValue = useCallback(val => {
         setFieldValue(name, val, false)
            // @ts-ignore
            .then(() => setFieldTouched(name, true))
      }, [setFieldValue, setFieldTouched, name])

      const push = useCallback(() => {
         _setFieldValue([...currentValues, initialValue])
      }, [_setFieldValue, currentValues, initialValue])

      const unshift = useCallback(() => {
         _setFieldValue([initialValue, ...currentValues])
      }, [_setFieldValue, currentValues, initialValue])

      const pop = useCallback(() => {
         const tmp = [...currentValues]
         const v = tmp.pop()
         _setFieldValue([...tmp])
         return v
      }, [_setFieldValue, currentValues, initialValue])

      const removeByIndex = useCallback(idx => {
         const tmp = [...currentValues]
         tmp.splice(idx, 1)
         _setFieldValue([...tmp])
      }, [_setFieldValue, currentValues])

      return useMemo(() => ({
         push,
         unshift,
         pop,
         removeByIndex
      }), [push, unshift, pop, removeByIndex])
      }
}