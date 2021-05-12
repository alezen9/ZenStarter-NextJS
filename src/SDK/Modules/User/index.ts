import { ZenServer } from '../../'
import { ListResponse } from '../../types'
import { AxiosRequestConfig } from 'axios'
import { User, FiltersUser } from './types'

class UserServer {
	#_server: ZenServer

	constructor(server: ZenServer) {
		this.#_server = server
	}

	async getList(filters: FiltersUser, axiosParams: AxiosRequestConfig = {}): Promise<ListResponse<User>> {
      const revisedFilters = { 
			...filters,
			...filters.ids && filters.ids.length && { ids: filters.ids.map(_id => String(_id)) }
		}
		return {
			paginated: [],
			totalCount: 0
		}
		// return this.#_server._self.post(`/userlist`, { filter: revisedFilters }, axiosParams)
	}

	async invite(_id: string): Promise<boolean> {
		return true
		// return this.#_server._self.post('/inviteUser', { _id })
	}
}

export default UserServer
