import ReduxRouteKey from './Keys'
import { Dispatch } from 'redux'
import { ZenRouteID } from '@_utils/routes/types'

export const route_setActive = (routeId: ZenRouteID) => async (dispatch: Dispatch) => {
  dispatch({
    type: ReduxRouteKey.ROUTE_SET_ACTIVE_ROUTE,
    payload: routeId
  })
}
