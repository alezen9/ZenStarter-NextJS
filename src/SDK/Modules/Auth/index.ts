import { get } from 'lodash'
import { ZenServer } from '../../'
import { AuthData } from './types'
import { LoginInput } from './inputs'
import { zenToolboxInstance } from '@_utils/Toolbox'

class AuthServer {
	private _server: ZenServer

	constructor(server: ZenServer) {
		this._server = server
	}

	setToken(token: string) {
		const tokenSet = get(this._server._self, 'defaults.headers.common.Authorization', undefined)
		let _token = tokenSet ? tokenSet.split(' ')[1] : undefined
		if (token !== _token) {
			this._server._self.defaults.headers.common['Authorization'] = `Bearer ${token}`
		}
		window.localStorage.setItem(this._server._LSToken, token)
	}

	hasToken(): boolean {
		return !!(
			get(this._server._self, 'defaults.headers.common.Authorization', undefined) ||
			(process.browser && window.localStorage.getItem(this._server._LSToken))
		)
   }

   async isTokenValid(token: string): Promise<boolean> {
      // api to get verify token (used on mount)
      // example with GQL below, restful apis would be a bit differet but still you'd have to call that api and return the result
      const query = `
      query {
         Auth_isTokenValid(token: "${token}")
      }`
      return this._server.API({ query, name: 'Auth_isTokenValid', params: token })
   }

	async login(body: LoginInput): Promise<AuthData> {
      // same here
		const query = `
      query {
         Auth_login(body: ${zenToolboxInstance.paramsToString(body)}) { token }
      }`
		return this._server.API({ query, name: 'Auth_login', params: body })
   }
   
   logout (_logout?: VoidFunction): void {
      window.localStorage.removeItem(this._server._LSToken)
      delete this._server._self.defaults.headers.common['Authorization']
      if (_logout) _logout() // this is the redirect to login thing that can be handled with a return as well
   }
}

export default AuthServer
