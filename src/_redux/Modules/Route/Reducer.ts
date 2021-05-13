import ReduxRouteKey from './Keys'
import produce from 'immer'
import { ReducerRoute } from './types'
import { ReduxAction } from '../sharedTypes'
import { get } from 'lodash'
import { routesPaths } from '@_utils/routes'

const initialState: ReducerRoute = {
  active: undefined,
  previous: undefined
}

export default function routeReducer (state = initialState, action: ReduxAction<ReduxRouteKey>) {
  const { type, payload } = action
  switch (type) {
    case ReduxRouteKey.ROUTE_SET_ACTIVE_ROUTE:
      if (payload === get(state, 'active._id', null)) return state
      return produce(state, draft => {
        const previous = draft.active
        const active = routesPaths[payload]
        draft.active = active
        draft.previous = previous
      })
    default:
      return state
  }
}
