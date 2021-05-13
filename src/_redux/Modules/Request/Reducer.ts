import ReduxRequestKey from './Keys'
import produce from 'immer'
import { ReducerRequest } from './types'
import { ReduxAction } from '../sharedTypes'

const initialState: ReducerRequest = {}

export default function unitaReducer (state = initialState, action: ReduxAction<ReduxRequestKey>) {
  const { type, payload } = action
  switch (type) {
    case ReduxRequestKey.REQUEST_FETCHING:
      return produce(state, draft => {
        draft[payload.key] = {
          status: ReduxRequestKey.REQUEST_FETCHING,
          error: null
        }
      })
    case ReduxRequestKey.REQUEST_SUCCESS:
      return produce(state, draft => {
        draft[payload.key] = {
          status: ReduxRequestKey.REQUEST_SUCCESS,
          error: null
        }
      })
    case ReduxRequestKey.REQUEST_FAILURE:
      return produce(state, draft => {
        draft[payload.key] = {
          status: ReduxRequestKey.REQUEST_FAILURE,
          error: payload.error
        }
      })
    case ReduxRequestKey.REQUEST_RESET_BY_KEY:
      return produce(state, draft => {
        delete draft[payload.key]
      })
    case ReduxRequestKey.REQUEST_RESET_ALL:
      return produce(state, draft => {
        draft = initialState
      })
    default:
      return state
  }
}
