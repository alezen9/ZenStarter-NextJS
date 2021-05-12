import { apiInstance } from 'src/SDK'

const swrUserFetchers = Object.freeze({
  usersFetcher: (key: string, filtersKey: string): Promise<any> => apiInstance.user.getList(JSON.parse(filtersKey))
})

export default swrUserFetchers
