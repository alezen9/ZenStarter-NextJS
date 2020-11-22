import { apiInstance } from 'src/SDK'

type Example = {
  idk: string
}

const swrExampleFetchers = Object.freeze({
  multipleItems: (key: string, filtersKey: string) => {
    // something like apiInstance.getUsers(JSON.parse(filtersKey))
    return Promise.resolve([] as Example[])
  },
  singleItem: (key: string, _id: string | null) => {
    // something like apiInstance.getUserById(_id)
    return Promise.resolve({} as Example)
  }
})

export default swrExampleFetchers