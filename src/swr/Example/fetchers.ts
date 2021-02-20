
// this should be taken from the SDK in the appropriate module
export type Example = {
  idk: string
}

const swrExampleFetchers = Object.freeze({
  multipleItems: (key: string, filtersKey: string) => {
    // something like apiInstance.user.getList(JSON.parse(filtersKey))
    return Promise.resolve([] as Example[])
  },
  singleItem: (key: string, _id: string | null) => {
    // something like apiInstance.user.getItem(_id)
    return Promise.resolve({} as Example)
  }
})

export default swrExampleFetchers