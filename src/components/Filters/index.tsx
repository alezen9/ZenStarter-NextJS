import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { Badge, Button, Grid, IconButton, makeStyles } from '@material-ui/core'
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded'
import { SearchBox } from './Search'
import FiltersDrawer from './Drawer'
import { FormikConfig, FormikValues, useFormik } from 'formik'
import Actions, { Action } from './Actions'
import { ZenPalette } from '@_palette'
import { Filter } from './Inputs'
import cleanDeep from 'clean-deep'
import { formatValuesFormikFilters } from './helpers'

const useStyles = makeStyles(theme => ({
	mainContainer: {
		marginTop: '.2em',
		marginBottom: '.5em'
	},
	attachedToLeft: {
		marginLeft: 'auto'
	}
}))

type Props = {
    withSearch?: boolean
    onSearchChange?: (v: any) => void
    onSearchSubmit?: (v: any) => void
    excludeSearchBoxFromFilters?: boolean
	 actions?: Action[]
	 filters?: Filter[]
    formikConfig?: Partial<FormikConfig<FormikValues>>
    autoFormatValuesOnSubmit?: boolean
}

const Filters = (props: Props) => {
	const { 
		withSearch = false,
      onSearchChange,
      onSearchSubmit,
      excludeSearchBoxFromFilters = false,
		filters = [],
		actions = [],
      formikConfig = {},
      autoFormatValuesOnSubmit = true
   } = props
   const { onSubmit, ...restOfConfig } = formikConfig
	const classes = useStyles()
   const [isDrawerOpen, setIsDrawerOpen] = useState(false)
   const [numActiveFilters, setNumActiveFilters] = useState(0)

	const toggleDrawer = useCallback((e?: any) => {
		if (e && e.type === 'keydown' && ((e as React.KeyboardEvent).key === 'Tab' || (e as React.KeyboardEvent).key === 'Shift')) return
		setIsDrawerOpen(state => !state)
   }, [])
   
   const localOnSubmit = useCallback((values, helpers) => {
      let _values = autoFormatValuesOnSubmit
         ? formatValuesFormikFilters(values)
         : values
      if(onSubmit) return onSubmit(_values, helpers)
      else console.log(_values)
   }, [onSubmit, autoFormatValuesOnSubmit])

	const formik = useFormik({
		initialValues: {},
		onSubmit: localOnSubmit,
		...restOfConfig
   })
   
   useEffect(() => {
      const vals = cleanDeep(formik.values)
      const n = Object.keys(vals).length
      setNumActiveFilters(n)
   }, [JSON.stringify(formik.values)])

	return (
		<>
			<Grid container spacing={3} justify='space-between' alignItems='center' className={classes.mainContainer} >
            {withSearch && <SearchBox
            formik={formik}
            onSearchChange={onSearchChange}
            onSearchSubmit={onSearchSubmit}
            excludeSearchBoxFromFilters={excludeSearchBoxFromFilters}
            />}
				<Grid container item xs={12} sm={withSearch ? 6 : 12} lg={withSearch ? 8 : 12} className={`${classes.attachedToLeft}`} justify='flex-end' alignItems='center' spacing={1}>
					<Actions actions={actions} showDivider={!!filters.length} />
					{filters.length 
					? <Grid item>
						<IconButton onClick={toggleDrawer}>
							<Badge badgeContent={numActiveFilters > 0 ? numActiveFilters : null} color="primary">
								<FilterListRoundedIcon style={{color: ZenPalette.typographyGrey}} />
							</Badge>
						</IconButton>
					</Grid>
					: <></>}
				</Grid>
			</Grid>
			<FiltersDrawer
				open={isDrawerOpen}
				toggleDrawer={toggleDrawer}
				formik={formik}
            filters={filters}
            excludeSearchBoxFromFilters={excludeSearchBoxFromFilters}
			/>
		</>
	)
}

export default React.memo(Filters)
