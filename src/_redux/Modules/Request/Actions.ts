import { Dispatch } from 'redux'
import ReduxRequestKey from './Keys'

export const request_isFetching = (dispatch: Dispatch) => (key: string) => {
  dispatch({
    type: ReduxRequestKey.REQUEST_FETCHING,
    payload: {
      key
    }
  })
}

export const request_Success = (dispatch: Dispatch) => (key: string) => {
  dispatch({
    type: ReduxRequestKey.REQUEST_SUCCESS,
    payload: {
      key
    }
  })
}

export const request_Failure = (dispatch: Dispatch) => (key: string, error: string) => {
  console.error(`requestFailure: ${key}`)
  console.error(error)
  dispatch({
    type: ReduxRequestKey.REQUEST_FAILURE,
    payload: {
      key,
      error
    }
  })
}

export const request_ResetAll = () => (dispatch: Dispatch) => {
  dispatch({
    type: ReduxRequestKey.REQUEST_RESET_ALL
  })
}

export const request_ResetByKey = (key: string) => (dispatch: Dispatch) => {
  dispatch({
    type: ReduxRequestKey.REQUEST_RESET_BY_KEY,
    payload: {
      key
    }
  })
}
