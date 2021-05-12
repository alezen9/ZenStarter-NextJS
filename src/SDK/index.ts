import { LSToken } from '@_utils/LSVariables'
import { AxiosInstance } from 'axios'
// start modules
import AuthServer from './Modules/Auth'
import UserServer from './Modules/User'
// end modules
import { zenAxiosInstance } from './helpers/ZenAxios'

export class ZenServer {
	_LSToken: string
	_self: AxiosInstance
	authHeader: string | undefined
	/** start modules */
	auth: AuthServer
	user: UserServer
	/** end modules */

	constructor() {
		this._LSToken = LSToken
		this.authHeader = process.browser ? window.localStorage.getItem(this._LSToken) : undefined
		// axios
		this._self = zenAxiosInstance.create(this)
		// modules
		this.auth = new AuthServer(this)
		this.user = new UserServer(this)
	}
}

export const apiInstance = new ZenServer()
