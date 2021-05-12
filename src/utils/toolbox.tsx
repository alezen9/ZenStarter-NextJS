import React from 'react'
import { OptionType } from "@_components/FormikInput"
import cleanDeep from "clean-deep"
import { compact, map, isUndefined, keys, has, get, entries, isObjectLike, isEqual, uniqueId } from "lodash"
import { DraggableObject } from '@_components/DraggableList'

class ZenToolbox {
   #formatter: Intl.NumberFormat

   constructor() {
      this.#formatter = new Intl.NumberFormat('it-IT', {
         style: 'currency',
         currency: 'EUR',
         minimumFractionDigits: 2,
         maximumFractionDigits: 2
      })
   }

   /**
    * @description Removes params from a url 
    */
   cleanPathname = (path: string = '') => path.split('?')[0]

   /**
    * @description Can't remember what it does, oops
    */
   getLabelsByValues = ({ values = [], options = [], list = false, separator = ', ' }) => {
      const labels = options.reduce((acc, { value, label }) => {
         if (values.includes(value)) return [...acc, label]
         return acc
      }, [])
      return list ? labels.map(label => <div key={uniqueId()}>• {label}</div>) : labels.join(separator)
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

   decamelize = (str: string, separator?: string) => {
      separator = typeof separator === 'undefined' ? ' ' : separator

      return this.capitalize(
         (str || '')
            .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
            .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
            .toLowerCase()
      )
   }

   /**
    * @description Returns OptionType[] for fields that have multiple choice (chips)
    */
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
      const formatted = this.#formatter.format(cents / 100)
      const res = formatted.replace(',', '.').replace('€', '').trim()
      return Number(res)
   }

   centsToEurosFormatted = (cents: number) => this.#formatter.format(cents / 100)

   /**
    * @description Given two objects it returns only what changed from object 1 (older) to object 2 (newer)
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


   /**
    * @description Similar to v2 but this one returns an object for the fields that has been changed { from: 'aleks', to: 'messi' }
    */
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

   getHeadersFromDraggableObject = (data: DraggableObject[] = []) => {
      return data.reduce((acc, el) => {
         return {
            ...acc,
            [el.id]: el.value
         }
      }, {})
   }
}

const zenToolbox = new ZenToolbox()
export default zenToolbox