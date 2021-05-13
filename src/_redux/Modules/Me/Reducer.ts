import ReduxUserKey from './Keys'
import produce from 'immer'
import { ReducerMe } from './types'
import { ReduxAction } from '../sharedTypes'
import { formatMe } from './helpers'

const initialState: ReducerMe = {
  item: {} as ReturnType<typeof formatMe>
}

export default function meReducer (state = initialState, action: ReduxAction<ReduxUserKey>) {
  const { type, payload} = action
  switch (type) {
    case ReduxUserKey.ME_GET_USER_CONNECTED:
              console.log(payload)
      return produce(state, draft => {
        draft.item = payload
      })
    case ReduxUserKey.ME_RESET_ALL:
      return produce(state, draft => {
        draft = initialState
      })
    default:
      return state
  }
}
