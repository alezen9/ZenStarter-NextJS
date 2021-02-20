import produce from "immer"
import { MutableRefObject, useCallback, useMemo, useRef, useState } from "react"

type Config<T> = {
   steps: T[]
}

type SingleStepStatus = {
   active: boolean
   visited: boolean
   completed: boolean
}

const getInitVals = (steps: any) => {
   return steps.reduce((acc, step, i) => {
      return {
         ...acc,
         [step]: {
            active: i === 0 ? true : false,
            visited: i === 0 ? true : false,
            completed: false
         }
      }
   }, {})
}

export type StepperFlowConfig = {
   updateStatus: (prevStep: number, nextStep: number) => void
   setActiveStepRef: MutableRefObject<(step: number) => void>
}

/**
 * 
 * Only for linear steppers
 */
export const useStepperFlow = <T extends string>(config: Config<T>) => {
   const { steps } = config
   const [status, setStatus] = useState<Record<T, SingleStepStatus>>(() => getInitVals(steps))
   const setActiveStepRef = useRef<(step: number) => void>(null)

   const resetStatus = useCallback(() => {
      const initStatus = getInitVals(steps)
      setStatus(initStatus)
   }, [JSON.stringify(steps)])

   const updateStatus = useCallback((prevStep: number, nextStep: number): void => {
      if(prevStep === nextStep) return
      if(nextStep === steps.length) {
         setStatus(produce(draft => {
            draft[steps[prevStep]].completed = true
         }))
         return
      }
      setStatus(
        produce(draft => {
            draft[steps[nextStep]].active = true
            draft[steps[nextStep]].visited = true
            draft[steps[prevStep]].active = false
            if(prevStep < nextStep && !draft[steps[prevStep]].completed) draft[steps[prevStep]].completed = true
        })
      )
   }, [steps.length])

   const backOneFromFinal = useCallback(() => {
      if(setActiveStepRef.current) {
         setStatus(produce(draft => {
            draft[steps[steps.length - 1]].active = true
         }))
         setActiveStepRef.current(steps.length - 1)
      }
   }, [])

   const flowConfig: StepperFlowConfig = useMemo(() => ({
      updateStatus,
      setActiveStepRef
   }), [updateStatus])

   return {
      status,
      flowConfig,
      backOneFromFinal,
      resetStatus
   }
}