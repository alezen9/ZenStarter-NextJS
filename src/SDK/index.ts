import { LSToken } from '@_utils/LSVariables'
import axios, { AxiosInstance, Method } from 'axios'
import { get } from 'lodash'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

type LogRequestType = {
  url: string
  method: Method
  response: any
  headers: any
  status: number,
  body?: any
  params?: any
  isError?: boolean
}

const LogRequest = (data: LogRequestType): void => {
  const { url, method, status, response, headers, body = {}, params = {}, isError = false } = data
  if(publicRuntimeConfig.ENV === 'test'){
    if(isError) {
      // console.error(`%c[${method}]: ${url}`, 'font-weight: bold')
      // console.error('Status: \n', status)
      console.error('Headers: \n', headers)
      method === 'post' && console.error('Body: \n', body)
      method === 'get' && console.error('Params: \n', params)
      console.error('Response: \n', response)
    } else {
      console.group(`%c[${method}]: ${url}`, 'color: rgb(42, 156, 71);')
      method === 'post' && console.log('Body: \n', body)
      method === 'get' && console.log('Params: \n', params)
      console.log(`Response: \n`, response)
      console.groupEnd()
    }
  }
}

class ZenServer {
  localStorageToken: string
  _self: AxiosInstance
  authHeader: string|undefined
  constructor () {
    this.localStorageToken = LSToken
    this.authHeader = process.browser ? window.localStorage.getItem(this.localStorageToken) : undefined
    this._self = axios.create({
      baseURL: `${publicRuntimeConfig.API_URL}`,
      timeout: 100000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...this.authHeader && { Authorization: `Bearer ${this.authHeader}` }
      }
    })
    this._self.interceptors.response.use(
      res => {
        const { data, params, headers, url, method } = res.config
        const response = get(res, 'data.data', res.data)
        LogRequest({
          url,
          method,
          status: get(res, 'status', 200),
          headers,
          body: data ? JSON.parse(data) : {},
          params,
          response
        })
        return response
      },
      error => {
        const { data, params, headers, url, method } = get(error, 'response.config', {})
        const err = get(error, 'response.data', error)
         LogRequest({
          url,
          method,
          status: get(error, 'response.status', 400),
          headers,
          body: data ? JSON.parse(data) : {},
          params,
          response: err,
          isError: true
        })
        throw err
      }
    )
    this._self.interceptors.request.use(config => {
      if (process.browser && !config.headers.common['Authorization'] && process.browser && window.localStorage.getItem(this.localStorageToken)) {
        const _token = window.localStorage.getItem(this.localStorageToken)
        const authorization = `Bearer ${_token}`
        config.headers.common['Authorization'] = authorization
        this._self.defaults.headers.common['Authorization'] = `Bearer ${_token}`
      }
      return config
    },
    err => Promise.reject(err))
  }

  setToken (token: string) {
    const tokenSet = get(this._self, 'defaults.headers.common.Authorization', undefined)
    let _token = tokenSet ? tokenSet.split(' ')[1] : undefined
    if (token !== _token) {
      this._self.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    window.localStorage.setItem(this.localStorageToken, token)
  }

  hasToken (): boolean {
    return !!(get(this._self, 'defaults.headers.common.Authorization', undefined) || (process.browser && window.localStorage.getItem(this.localStorageToken)))
  }

   user_login (body: { username: string, password: string }): Promise<{ token: string }> { 
     return Promise.resolve({ token: 'randomtoken' })
    // e.g. return this._self.post(`/signin`, body)
  }

  user_logout (_logout?: VoidFunction): void {
    window.localStorage.removeItem(this.localStorageToken)
    this._self.defaults.headers.common['Authorization'] = undefined
    if (_logout) _logout()
  }
}

export const apiInstance = new ZenServer()
