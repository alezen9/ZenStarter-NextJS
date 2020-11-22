import { useFormik } from 'formik'
import React, { useCallback, useEffect, useState } from 'react'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'
import { Grid, InputAdornment } from '@material-ui/core'
import FormikInput, { FormikEssentials } from '@_components/FormikInput'
import { usePrevious } from '@_utils/customHooks'
import { get } from 'lodash'

const SearchAdornment = () => <InputAdornment position='end' >
  <SearchRoundedIcon />
</InputAdornment>

export const filters = [
  {
    type: 'text',
    name: 'searchText',
    label: 'Search',
    sm: 6,
    lg: 4,
    inputProps: {
      endAdornment: <SearchAdornment />
    }
  }
]

type SearchBoxProps = {
  onSearchChange: (v: any) => void
  onSearchSubmit: (v: any) => void
  formik: FormikEssentials & { handleSubmit: any }
  excludeSearchBoxFromFilters: boolean
}

export const SearchBox = React.memo((props: SearchBoxProps) => {
  const { formik, onSearchChange, onSearchSubmit, excludeSearchBoxFromFilters = false } = props
  const [val, setVal] = useState('')
  const formikPrevVal = usePrevious(get(formik, 'values.searchText', null))

  const handleChange = useCallback(v => {
      if(onSearchChange) onSearchChange(v)
      if(!excludeSearchBoxFromFilters) formik.setFieldValue('searchText', v)
  }, [onSearchChange, formik.setFieldValue, excludeSearchBoxFromFilters])

   const handleSubmit = useCallback(({ searchText }) => {
      if(onSearchSubmit) onSearchSubmit(searchText)
      if(!excludeSearchBoxFromFilters) formik.handleSubmit()
   }, [onSearchSubmit, formik.handleSubmit])

  const localFormik = useFormik({
     initialValues: { searchText: '' },
     onSubmit: handleSubmit
  })

   useEffect(() => {
      if(formikPrevVal && !get(formik, 'values.searchText', null)) localFormik.resetForm()
   }, [get(formik, 'values.searchText', null), formikPrevVal, localFormik.resetForm])

  return (
   <Grid item xs={12} sm={6} lg={4}>
      <form onSubmit={localFormik.handleSubmit}>
         <FormikInput
            name='searchText'
            label='Search'
            inputProps={{
            endAdornment: <SearchAdornment />
            }}
            supplementaryOnChange={handleChange}
            {...localFormik}
         />
      </form>
   </Grid>
  )
})