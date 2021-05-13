import { Dispatch } from 'redux'
import { request_Failure, request_isFetching, request_Success } from '../Request/Actions'
import ReduxUserKey from './Keys'
import { get } from 'lodash'
import { formatMe } from './helpers'
import { GenericReduxKey } from 'src/_redux'
import { apiInstance } from 'src/SDK'
import { LSToken } from '@_utils/LSVariables'

export const me_getUserConnected = (data?: {
  key?: string
}) => async (dispatch: Dispatch) => {
  const { key = ReduxUserKey.ME_GET_USER_CONNECTED } = data || {}
  try {
    request_isFetching(dispatch)(key)
    // @ts-ignore (ignore because there is no such api)
    const res = await apiInstance.me.getUserConnected()
    const user = formatMe(get(res, 'result', {}))
    dispatch({
      type: ReduxUserKey.ME_GET_USER_CONNECTED,
      payload: user
    })
    request_Success(dispatch)(key)
    return true
  } catch (error) {
    request_Failure(dispatch)(key, error)
    return false
  }
}

export const me_login = (data: {
  key?: string
  username: string
  password: string
}) => async (dispatch: Dispatch) => {
  const { key = ReduxUserKey.ME_LOGIN, username, password } = data
  try {
    request_isFetching(dispatch)(key)
    const res = await apiInstance.auth.login({ username, password })
    if(!!res.token) {
      apiInstance.auth.setToken(res.token)
      window.localStorage.setItem(LSToken, res.token)
      await me_getUserConnected()(dispatch)
    } else {
      throw new Error('Username o password errati')
    }
    request_Success(dispatch)(key)
    return true
  } catch (error) {
    request_Failure(dispatch)(key, error)
    return false
  }
}

export const me_logout = (data?: {
  key?: string
}) => async (dispatch: Dispatch) => {
  const { key = ReduxUserKey.ME_LOGOUT } = data || {}
  try {
    request_isFetching(dispatch)(key)
    apiInstance.auth.logout()
    dispatch({
      type: GenericReduxKey.RESET_EVERYTHING
    })
    request_Success(dispatch)(key)
    return true
  } catch (error) {
    request_Failure(dispatch)(key, error)
    return false
  }
}

export const me_resetAll = () => async (dispatch: Dispatch) => {
  dispatch({
    type: ReduxUserKey.ME_RESET_ALL
  })
}