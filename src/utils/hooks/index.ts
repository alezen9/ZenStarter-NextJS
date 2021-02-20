import { MutableRefObject, useEffect, useRef } from "react"
import { ZenMainHooks } from './main'

class ZenHooks extends ZenMainHooks {

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

}

export const zenHooksInstance = new ZenHooks()