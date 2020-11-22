import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { get } from 'lodash'
import { makeStyles, FormHelperText, InputAdornment, CircularProgress } from '@material-ui/core'
import { ZenPalette } from '@_palette'
import { OptionType } from '.'
import { matchSorter } from 'match-sorter'

const useStyles = makeStyles(theme => ({
  listbox: {
    padding: '.5em'
  },
  option: {
    position: 'relative',
    padding: '.5em 1em',
    minWidth: 150,
    display: 'flex',
    '&:not(:last-of-type):before': {
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      content: '""',
      width: '90%',
      height: '100%',
      borderBottom: theme.type === 'light'
        ? '1px solid rgba(0,0,0,.1)'
        : '1px solid rgba(255,255,255,.2)'
    },
    ...theme.type === 'dark' && {
      '&:hover': {
        backgroundColor: '#444'
      }
    }
  },
  groupLabel: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    backgroundColor: theme.type === 'light'
      ? '#d3d3d3'
      : '#111'
  },
  noOptions: {
    color: ZenPalette.typographyGrey
  },
  inputRoot: {
    '& > fieldset': {
      borderColor: (props: any) => props.error
        ? '#ff443a'
        : ZenPalette.borderColor
    }
  }
}))

const Adornment = React.memo(() => <InputAdornment position='end' >
  <CircularProgress style={{ width: 20, height: 20 }} />
</InputAdornment>)

const inputProps = {
  endAdornment: <Adornment />
}

const filterOptions = (options: OptionType[], { inputValue }) => matchSorter(options, inputValue, { keys: ['label'] })

type Props = {
  options?: OptionType[]
  label: string
  id?: string
  name: string
  required?: boolean
  disabled?: boolean
  errors: any
  onChange: (e: any, d: any) => void
  onSearchText?: (v: string) => Promise<OptionType[]>
  multiple?: boolean
  loading?: boolean
  values: any
  valuesToexcludeFromOptions?: string[]
}

const InputAsyncAutocomplete = (props: Props) => {
  const { label, id, name, disabled, errors, onChange, onSearchText, multiple = false, values, valuesToexcludeFromOptions = [] } = props
  const classes = useStyles({ error: !!get(errors, name, false) })
  const [inputValue, setInputValue] = useState(multiple ? '' : get(values, `${name}.label`, ''))
  const [shouldFetch, setShouldFetch] = useState(false)
  const [opts, setOpts] = useState([])
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    let mounted = true
    if(onSearchText && inputValue && shouldFetch){
      setIsFetching(true)
      onSearchText(inputValue)
        .then(res => {
          if(mounted) {
            setOpts(res.filter(({ value }) => !valuesToexcludeFromOptions.includes(value)))
            setIsFetching(false)
          }
        })
        .catch(err => {})
    }
    return () => {
      mounted = false
    }
  }, [onSearchText, inputValue, shouldFetch, JSON.stringify(valuesToexcludeFromOptions)])

  return (
    <>
      <Autocomplete
        id={id}
        freeSolo
        loading={isFetching}
        multiple={multiple}
        disabled={disabled}
        classes={classes}
        defaultValue={multiple ? [] : null}
        onChange={onChange}
        options={opts}
        ChipProps={{ style: { display: 'none' } }}
        getOptionLabel={option => option.label || ''}
        inputValue={inputValue}
        filterOptions={filterOptions}
        filterSelectedOptions
        loadingText={`N'attimo...`}
        noOptionsText='Nessun risultato'
        onInputChange={(e, d) => {
          if(e && (e.type === 'change' || e.type === 'click')) {
            if(e.type === 'click' && !d && !multiple) onChange(e, null)
            setInputValue(d)
            setShouldFetch(e && e.type === 'change')
          }          
        }}
        renderInput={params => <TextField {...params} {...isFetching && { InputProps: inputProps }} placeholder='Cerca . . .' label={label} variant='outlined' />}
      />
      {get(errors, name, false) && <FormHelperText margin='dense' style={{ color: 'red', margin: '12px 14px 0 14px' }} id={`${id}_error`}>{get(errors, name, '')}</FormHelperText>}
    </>
  )
}

export default React.memo(InputAsyncAutocomplete)
