import React from 'react'
import { routes } from './routes'
import { isObject, uniqueId, reduce, map, compact } from 'lodash'
import cleanDeep from 'clean-deep'
import { OptionType } from '@_components/FormikInput'

export const cleanPathname = (path: string = '') => path.split('?')[0]

export const getTitleFromPathname = (pathname: string) => {
  const routeInfo: any = routes.find(({ path }) => cleanPathname(path) === pathname)
  if (!routeInfo) return 'Dashboard'
  return routeInfo.title
}

export const capitalize = (s: string) => s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase()

export const asyncTimeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const camelize = (str: string) => {
  if (!str) return ''
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return '' // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase()
  })
}

export const paramsToString = params => {
  let str = ''
  for (const key in params) {
    if (isObject(params[key])) {
      if (params[key] instanceof Array) str += key + ':' + '[' + params[key].map(el => isNaN(el) ? `"${el}"` : el) + ']' + ', '
      else str += key + ':' + paramsToString(params[key]) + ', '
    } else if (isNaN(params[key])) str += key + ':"' + params[key] + '", '
    else str += key + ':' + params[key] + ', '
  }
  return `{${str.slice(0, -2)}}`
}

export const getLabelsByValues = ({ values = [], options = [], list = false, separator = ', ' }) => {
  const labels = options.reduce((acc, { value, label }) => {
    if (values.includes(value)) return [...acc, label]
    return acc
  }, [])
  return list
    ? labels.map(label => <div key={uniqueId()}>• {label}</div>)
    : labels.join(separator)
}

export const decamelize = (str: string, separator?: string) => {
  separator = typeof separator === 'undefined' ? ' ' : separator

  return capitalize((str || '')
    .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
    .toLowerCase())
}


export const cleanQueryParams = query => {
  return reduce(query, (acc, value, key) => {
    if (/^\[+[a-zA-Z0-9]+\]/gmi.test(value)) return acc
    return {
      ...acc,
      [key]: value
    }
  }, {})
}

export const getMultipleInitValue = (vals = [], options = []) => {
  return cleanDeep(options.reduce((acc, val) => {
    const { value, label } = val || {}
    if (vals.includes(value)) acc.push({ value, label })
    return acc
  }, []))
}

export const getOptionsByEnum = (entity): OptionType[] => compact(map(entity, (el, i) => !isNaN(el)
   ? { label: decamelize(i), value: parseInt(el) }
   : null))

export const formatter = new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

export const eurosToCents = (euros: number) => Math.trunc(euros * 100)

export const centsToEuros = (cents: number) => formatter.format(cents / 100)