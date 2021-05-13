import { createStore, applyMiddleware, combineReducers, AnyAction } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
/** modules here */
import requestReducer from './Modules/Request/Reducer'
import meReducer from './Modules/Me/Reducer'
import routeReducer from './Modules/Route/Reducer'
/** end modules */
import { ReducerRequest } from './Modules/Request/types'
import { ReducerMe } from './Modules/Me/types'
import { ReducerRoute } from './Modules/Route/types'
import { Reducer } from 'react'

export enum GenericReduxKey {
  RESET_EVERYTHING = 'RESET_EVERYTHING'
}

export type ZenReduxStore = {
  _request: ReducerRequest
  _me: ReducerMe
  _route: ReducerRoute
}

class ReduxStore {
  #rootReducer: Reducer<ZenReduxStore, AnyAction>

  constructor () {
    const reducers = this.combineReducers()
    this.#rootReducer = this.addResetEverything(reducers)
  }

  private combineReducers = () => {
    const reducers = combineReducers<ZenReduxStore>({
      _request: requestReducer,
      _me: meReducer,
      _route: routeReducer
    })
    return reducers
  }

  private addResetEverything = (reducers: Reducer<ZenReduxStore, AnyAction>) => {
    const rootReducer = (state: ZenReduxStore, action: AnyAction) => {
      if (action.type === GenericReduxKey.RESET_EVERYTHING) {
        state = undefined
      }
      return reducers(state, action)
    }
    return rootReducer
  }

  public init = () => {
    const store = createStore(
      this.#rootReducer,
      composeWithDevTools(
        applyMiddleware(
          thunk
        )
      )
    )
    return store
  }
}

const reduxStoreInstance = new ReduxStore()
export const store = reduxStoreInstance.init()

export type GetReduxState = () => ZenReduxStore