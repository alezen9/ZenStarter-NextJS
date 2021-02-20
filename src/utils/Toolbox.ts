import { OptionType } from "@_components/FormikInput"
import cleanDeep from "clean-deep"
import { compact, isObject, map, isUndefined, keys, has, get, entries, isObjectLike, isEqual } from "lodash"

class ZenToolbox {
   private formatter: Intl.NumberFormat

   constructor(){
      this.formatter = new Intl.NumberFormat('it-IT', {
         style: 'currency',
         currency: 'EUR',
         minimumFractionDigits: 2,
         maximumFractionDigits: 2
      })
   }

   capitalize = (s: string) => s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase()

   asyncTimeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

   camelize = (str: string) => {
      if (!str) return ''
      return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
         if (+match === 0) return '' // or if (/\s+/.test(match)) for white spaces
         return index === 0 ? match.toLowerCase() : match.toUpperCase()
      })
   }

   /**
    * @description Takes an object as param and returns the same object in string format valid for gql queries
    */
   paramsToString = params => {
      let str = ''
      for (const key in params) {
         if (isObject(params[key])) {
            if (params[key] instanceof Array)
               str += key + ':' + '[' + params[key].map(el => (isNaN(el) ? `"${el}"` : el)) + ']' + ', '
            else str += key + ':' + this.paramsToString(params[key]) + ', '
         } else if (isNaN(params[key])) str += key + ':"' + params[key] + '", '
         else str += key + ':' + params[key] + ', '
      }
      return `{${str.slice(0, -2)}}`
   }

   decamelize = (str: string, separator?: string) => {
      separator = typeof separator === 'undefined' ? ' ' : separator

      return this.capitalize(
         (str || '')
            .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
            .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
            .toLowerCase()
      )
   }

   getMultipleInitValue = (vals: OptionType[] = [], options: OptionType[] = []) => {
      return cleanDeep(
         options.reduce((acc, val) => {
            const { value, label } = val || {}
            if (vals.includes(value)) acc.push({ value, label })
            return acc
         }, [])
      )
   }

   getOptionsByEnum = (entity): OptionType[] => {
      return compact(map(entity, (el, i) => (!isNaN(el) ? { label: this.decamelize(i), value: parseInt(el) } : null)))
   }

   eurosToCents = (euros: number) => Math.trunc(euros * 100)
   
   centsToEuros = (cents: number) => {
      const formatted = this.formatter.format(cents / 100)
      const res = formatted.replace(',', '.').replace('€', '').trim()
      return Number(res)
   }

   centsToEurosFormatted = (cents: number) => this.formatter.format(cents / 100)

   /**
    * 
    * @description Given two objects it returns what changed from object 1 (older) to object 2 (newer)
    */
   v2_deepDiff = (fromObject: Object, toObject: Object) => {
      const changes = {}

      const buildPath = (path: string, obj: Object, key: string) => isUndefined(path) ? key : `${path}.${key}`

      const walk = (fromObject: Object, toObject: Object, path?: string) => {
         for (const key of keys(fromObject)) {
            const currentPath = buildPath(path, fromObject, key)
            if (!has(toObject, key)) {
            changes[currentPath] = get(toObject, key, null)
            }
         }

         for (const [key, to] of entries(toObject)) {
            const currentPath = buildPath(path, toObject, key)
            if (!has(fromObject, key)) {
            changes[currentPath] = to
            } else {
            const from = get(fromObject, key)
            if (!isEqual(from, to)) {
               if (isObjectLike(to) && isObjectLike(from)) {
                  walk(from, to, currentPath)
               } else {
                  changes[currentPath] = to
               }
            }
            }
         }
      }

      walk(fromObject, toObject)

      return changes
   }

   deepDiff = (fromObject: Object, toObject: Object) => {
      const changes = {}

      const buildPath = (path: string, obj: Object, key: string) => isUndefined(path) ? key : `${path}.${key}`

      const walk = (fromObject: Object, toObject: Object, path?: string) => {
         for (const key of keys(fromObject)) {
            const currentPath = buildPath(path, fromObject, key)
            if (!has(toObject, key)) {
            changes[currentPath] = { from: get(fromObject, key) }
            }
         }

         for (const [key, to] of entries(toObject)) {
            const currentPath = buildPath(path, toObject, key)
            if (!has(fromObject, key)) {
            changes[currentPath] = { to }
            } else {
            const from = get(fromObject, key)
            if (!isEqual(from, to)) {
               if (isObjectLike(to) && isObjectLike(from)) {
                  walk(from, to, currentPath)
               } else {
                  changes[currentPath] = { from, to }
               }
            }
            }
         }
      }

      walk(fromObject, toObject)

      return changes
   }
}

export const zenToolboxInstance = new ZenToolbox()