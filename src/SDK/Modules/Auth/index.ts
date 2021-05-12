import { get } from 'lodash'
import { ZenServer } from '../../'
import { AuthData, LoginInput } from './types'

/**
 * ONLY FOR TESTING PURPOSE
 */

const credentials = {
	username: 'zenStarter',
	password: 'zenStarter1234',
	token: '123321#This_is_a_fake_token#2343243'
}

/**
 * 
 */

class AuthServer {
	#_server: ZenServer

	constructor(server: ZenServer) {
		this.#_server = server
	}

	setToken(token: string) {
		const tokenSet = get(this.#_server._self, 'defaults.headers.common.token', undefined)
		let _token = tokenSet ? tokenSet.split(' ')[1] : undefined
		if (token !== _token) {
			this.#_server._self.defaults.headers.common['token'] = `${token}`
		}
		window.localStorage.setItem(this.#_server._LSToken, token)
	}

	hasToken(): boolean {
		return !!(
			get(this.#_server._self, 'defaults.headers.common.token', undefined) ||
			(process.browser && window.localStorage.getItem(this.#_server._LSToken))
		)
   }

   async isTokenValid(token: string): Promise<boolean> {
		return token === credentials.token
		// return this.#_server._self.get(`/isTokenValid`, { params: { token } })
   }

	async login(body: LoginInput): Promise<AuthData> {
		const { token, username, password } = credentials
		if(username === body.username && password === body.password) return { token }
		else throw new Error('Username o password errate.')
		// return this.#_server._self.post(`/login`, body)
   }
   
   logout (_logout?: VoidFunction): void {
      window.localStorage.removeItem(this.#_server._LSToken)
      delete this.#_server._self.defaults.headers.common['token']
      if (_logout) _logout()
   }
}

export default AuthServer
