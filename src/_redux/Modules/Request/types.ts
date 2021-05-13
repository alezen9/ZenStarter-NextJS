import ReduxRequestKey from "./Keys"

type RequestStatus = {
  status: ReduxRequestKey
  error?: string
}

export type ReducerRequest = Record<string, RequestStatus>