import cleanDeep from 'clean-deep'
import { get, isArray, isObject, reduce } from 'lodash'

export const formatValuesFormikFilters = (values: any): object => {
  return cleanDeep(reduce(values, (acc, value, key) => {
    if (isArray(value)) {
      return {
        ...acc,
        [key]: value.map(({ value }) => value)
      }
    }
    if(isObject(value) && get(value, 'value', null) !== null && get(value, 'label', null) !== null) {
       return {
        ...acc,
        [key]: get(value, 'value', null)
      }
    }
    return { ...acc, [key]: value }
  }, {}))
}
