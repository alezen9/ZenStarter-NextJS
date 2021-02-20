import React from 'react'
import { routes } from './routes'
import { uniqueId, reduce } from 'lodash'
import { ZenPalette } from '@_palette'

export const cleanPathname = (path: string = '') => path.split('?')[0]

export const getTitleFromPathname = (pathname: string) => {
	const routeInfo: any = routes.find(({ path }) => cleanPathname(path) === pathname)
	if (!routeInfo) return 'Dashboard'
	return routeInfo.title
}

export const getLabelsByValues = ({ values = [], options = [], list = false, separator = ', ' }) => {
	const labels = options.reduce((acc, { value, label }) => {
		if (values.includes(value)) return [...acc, label]
		return acc
	}, [])
	return list ? labels.map(label => <div key={uniqueId()}>• {label}</div>) : labels.join(separator)
}

export const cleanQueryParams = query => {
	return reduce(
		query,
		(acc, value, key) => {
			if (/^\[+[a-zA-Z0-9]+\]/gim.test(value)) return acc
			return {
				...acc,
				[key]: value
			}
		},
		{}
	)
}

export const getScoreColor = (value: number) => {
	if (value < 40) return 'crimson'
	if (value < 65) return 'orange'
	if (value < 85) return ZenPalette.darkGreen
	if (value <= 100) return '#B29600'
	return ZenPalette.typographyGrey
}

export const getScoreColorFillGradient = (value: number) => {
   if (value < 40) return 'url(#red)'
	if (value < 65) return 'url(#orange)'
	if (value < 85) return 'url(#green)'
	if (value <= 100) return 'url(#gold)'
	return ZenPalette.typographyGrey
}