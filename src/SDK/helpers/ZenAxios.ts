import { ZenServer } from '..'
import axios, { AxiosInstance } from 'axios'
import { get } from 'lodash'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

class ZenAxios {
	create(server: ZenServer): AxiosInstance {
		const _self: AxiosInstance = axios.create({
			baseURL: `${publicRuntimeConfig.API_URL}`,
			timeout: 100000,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				common: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					...(server.authHeader && { token: `${server.authHeader}` })
				}
			}
		})
		this.setRequestInterceptor(_self, server._LSToken)
		this.setResponseInterceptor(_self)
		return _self
	}

	private setRequestInterceptor(_self: AxiosInstance, tokenName): void {
		_self.interceptors.request.use(
			config => {
				if (process.browser && !config.headers.common['token'] && window.localStorage.getItem(tokenName)) {
					const _token = window.localStorage.getItem(tokenName)
					const authorization = `${_token}`
					config.headers.common['token'] = authorization
					_self.defaults.headers.common['token'] = authorization
				}
				return config
			},
			err => Promise.reject(err)
		)
	}

	private setResponseInterceptor(_self: AxiosInstance): void {
		_self.interceptors.response.use(
			res => {
        const { data, params, headers, url, method } = res.config
        const response = get(res, 'data.data', res.data)
        this.LogRequest({
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
         this.LogRequest({
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
	}

		private LogRequest = ({ url, method, status, response, headers, body = {}, params = {}, isError = false }) => {
		if (publicRuntimeConfig.ENV === 'test') {
			if(isError) {
				console.error('Headers: \n', headers)
				method === 'post' && console.error('Body: \n', body)
				method === 'get' && console.error('Params: \n', params)
				console.error('Response: \n', response)
			} else {
				console.groupCollapsed(`%c[${method}]: ${url}`, 'color: rgb(42, 156, 71);')
				method === 'post' && console.log('Body: \n', body)
				method === 'get' && console.log('Params: \n', params)
				console.log(`Response: \n`, response)
				console.groupEnd()
			}
		}
	}
}

export const zenAxiosInstance = new ZenAxios()