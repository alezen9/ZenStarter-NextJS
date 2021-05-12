import cleanDeep from 'clean-deep'
import { get, isArray, isObject, reduce } from 'lodash'


/**
 * 
 * @description Takes as arg formik values and returns a formatted version
 * @example vlaues: {
 *  name: 'Leo', => string
 *  surname: 'Messi', => string
 *  country: { => OptionType
 *    label: 'Argentina',
 *    value: 'AG'
 *  },
 *  teams: [{ => OptionType[]
 *    label: 'Argentina National Team',
 *    value: 'AFA'
 *  },
 *  {
 *    label: 'FC Barcelona',
 *    value: 'FCB'
 *  }]
 * }
 * 
 * returned object: {
 *  name: 'Leo', => string
 *  surname: 'Messi', => string,
 *  country: 'AG', => string
 *  teams: ['AFA', 'FCB'] => string[]
 * }
 */
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
