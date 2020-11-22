import React, { useState, Fragment, useMemo, ReactNode, useCallback, ReactNodeArray, ReactChildren, ReactChild } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { FormControl, FormHelperText, Grid, IconButton, InputAdornment, Chip, FormControlLabel, GridSpacing } from '@material-ui/core'
import { get, uniqBy, uniqueId, compact } from 'lodash'
import Lock from '@material-ui/icons/Lock'
import LockOpen from '@material-ui/icons/LockOpen'
import InputSelect from './InputSelect'
import InputCheckbox from './InputCheckbox'
import InputPhone from './InputPhone'
import InputAddress from './InputAddress'
import InputAsyncAutocomplete from './InputAsyncAutocomplete'
import InputSwitch from './InputSwitch'
import dayjs from 'dayjs'
import InputAutocomplete from './InputAutocomplete'
import InputSlider from './InputSlider'
import { ZenPalette } from '@_palette'

const useStyles = makeStyles(theme => ({
  gridWrapper: {
    '& textarea': {
      overflow: 'auto'
    }
  },
  formControl: {
    width: '100%',
    marginBottom: 10
  },
  textField: {
    width: '100%'
  },
  checkSwitchLabel: {
    fontSize: '.85em'
  },
  chipClass: (props: any) => ({
    margin: '.5em',
    borderRadius: 5,
    maxWidth: 'calc(100% - 1em)',
    opacity: .9,
    ...props.fullWidthChip && {
      width: '100%',
      justifyContent: 'space-between'  
    }
  })
}))

const labelPlacementAccepted = ['top', 'bottom', 'start', 'end']

type GridSize = 1|2|3|4|5|6|7|8|9|10|11|12

type GridWrapperProps = {
  xs?: GridSize
  sm?: GridSize
  md?: GridSize
  lg?: GridSize
  xl?: GridSize
  container?: boolean
  spacing?: GridSpacing
  gridStyle?: any
  children?: any | any[]
}

export type OptionType = {
  label: any
  value: any
  component?: ReactNode
  [field: string]: any
}

export type FormikEssentials = {
  values: any
  errors: any
  setFieldTouched: any
  setFieldValue: any
  setFieldError: any
  setValues?: any
  handleSubmit?: any
  setTouched?: any
  resetForm?: any
}


type Props = FormikEssentials & GridWrapperProps & {
  id?: any
  name: string
  label: any
  type?: 'text'|'password'|'phone'|'checkbox'|'switch'|'select'|'autocomplete'|'asyncAutocomplete'|'date'|'address'|'slider'
  handleChange?: any
  helperText?: string
  variant?: 'outlined'
  disabled?: boolean
  multiline?: boolean
  rows?: number
  grouped?: boolean
  required?: boolean
  supplementaryOnChange?: (e: any, v?: any) => void
  style?: any
  labelPlacement?: 'bottom'|'top'|'end'|'start'
  inputProps?: any
  multiple?: boolean
  onSearchText?: (v: string) => Promise<OptionType[]>
  loading?: boolean
  sortByLabel?: boolean
  autoWidth?: boolean
  options?: OptionType[]
  large?: boolean
  showExpandButton?: boolean
  icon?: React.ReactNode
  checkedIcon?: React.ReactNode
  fullWidthChip?: boolean
  valuesToexcludeFromOptions?: string[]
  placeholder?: string
}

export type FormikInputProps = Props

const FormikInput = (props: Props) => {
  const { formControl, textField, chipClass, checkSwitchLabel } = useStyles({ fullWidthChip: !!props.fullWidthChip })
  const [show, toggleShow] = useState(false)
  const {
    id = `${props.name}_${Math.round(Math.random() * 100)}`,
    name,
    label: _label,
    type = 'text',
    values = {},
    handleChange,
    helperText = '',
    errors = {},
    variant = 'outlined',
    disabled = false,
    xs = 12,
    multiline = false,
    rows = 10,
    grouped = false,
    required = false,
    supplementaryOnChange,
    style = {},
    placeholder = ''
  } = props

  const labelPlacementCorrected = useMemo(() => {
    const { labelPlacement } = props
    if (labelPlacementAccepted.includes(labelPlacement)) return labelPlacement
    return 'end'
  }, [get(props, 'labelPlacement', undefined)])

  const label = useMemo(() => typeof _label === 'string'
    ? `${_label || ''}${required ? '*' : ''}`
    : _label, [_label, required])

  const defaultProps = { ...props, id, type, values, handleChange, helperText, errors, variant, disabled, xs, multiline, rows, required, label }


  const toggleShowMemoized = useCallback((e: any) => toggleShow(state => !state), [])

  const PasswordAdornment = () => <InputAdornment position='end' >
    <IconButton aria-label='Show/Hide password' onClick={toggleShowMemoized}>
      {show ? <LockOpen /> : <Lock />}
    </IconButton>
  </InputAdornment>

  let inputProps = {}

  const hasChips = get(values, `${name}.0.label`, false)

  switch (type) {
    case 'slider':
      const onSliderChange = (e, d: number) => {
        props.setFieldTouched(name, true, false)
        props.setFieldValue(name, d, true)
      }
      return (
        <GridWrapper {...props} container spacing={2} gridStyle={{ margin: '0 0 10px 0', padding: 0 }}>
          <InputSlider {...defaultProps} onChange={onSliderChange} />
        </GridWrapper>
      )
    case 'address':
      const onAddressChange = v => {
        props.setFieldTouched(name, true, false)
        props.setFieldValue(name, v, true)
      }
      return (
        <GridWrapper {...props} container spacing={2} gridStyle={{ margin: '0 0 10px 0', padding: 0 }}>
          <InputAddress {...defaultProps} onChange={onAddressChange} />
        </GridWrapper>
      )
    case 'password':
      inputProps = {
        type: show ? 'text' : 'password',
        endAdornment: <PasswordAdornment />
      }
      break
    case 'phone':
      const onChangePhone = (v: string) => {
        props.setFieldTouched(name, true, false)
        props.setFieldValue(name, v, true)
      }
      return (
        <GridWrapper {...props}>
          <FormControl variant={variant} className={formControl} {...{ style }} >
            <InputPhone {...defaultProps} onChange={onChangePhone} />
          </FormControl>
        </GridWrapper>
      )
    case 'checkbox':
      const onChangeCheckbox = (e, d: boolean) => {
        props.setFieldTouched(name, true, false)
        props.setFieldValue(name, d, true)
        if (supplementaryOnChange) supplementaryOnChange(e, e.target.checked)
      }
      return (
        <GridWrapper {...props}>
          <FormControlLabel
            classes={{
              label: checkSwitchLabel
            }}
            style={{ marginTop: 16, ...style }}
            onChange={onChangeCheckbox}
            value={get(values, name, false)}
            control={<InputCheckbox {...defaultProps} onChange={onChangeCheckbox} />}
            label={label}
            disabled={disabled}
            labelPlacement={labelPlacementCorrected}
          />
        </GridWrapper>
      )
    case 'switch':
      const onChangeSwitch = (e, d: boolean) => {
        props.setFieldTouched(name, true, false)
        props.setFieldValue(name, d, true)
      }
      return (
        <GridWrapper {...props}>
          <FormControlLabel
            classes={{
              label: checkSwitchLabel
            }}
            style={{ marginTop: 16, ...style }}
            onChange={onChangeSwitch}
            value={get(values, name, false)}
            control={<InputSwitch {...defaultProps} onChange={onChangeSwitch} />}
            label={label}
            disabled={disabled}
            labelPlacement={labelPlacementCorrected}
          />
        </GridWrapper>
      )
    case 'select':
      const onChangeSelect = (e, d) => {
        if (props.multiple) {
           const __value = d.props.value
           const __label = get(d, 'props.children.props.children.props.label', get(d, 'props.children.props.children', '-'))
          const _v = { value: __value, label: __label }
          if (_v.value === -1) {
            props.setFieldTouched(name, true, false)
            props.setFieldValue(name, [_v])
          } else if (_v.value !== null) {
            const newValues = [...new Set([...get(values, name, []), _v])]
            props.setFieldTouched(name, true, false)
            props.setFieldValue(name, newValues.filter(({ value }) => value !== -1))
          }
        } else {
           console.log(d)
          props.setFieldTouched(name, true, false)
          props.setFieldValue(name, e.target.value, true)
        }
      }

      const handleChipDelete = v => () => {
        props.setFieldTouched(name, true, false)
        props.setFieldValue(name, [...get(values, name, []).filter(val => val.value !== v)])
      }

      const renderChips = () => (get(values, name, []) || []).map((chip, i) => {
        return chip.value === -1
          ? <Fragment key={i} />
          : <Chip
            className={chipClass}
            label={chip.label}
            key={i}
            onDelete={handleChipDelete(chip.value)}
            color='primary'
          />
      })

      return (
        <GridWrapper {...props}>
          <FormControl variant={variant} className={formControl} style={{ marginTop: 16, ...style }}>
            <InputSelect {...defaultProps} onChange={onChangeSelect} />
          </FormControl>
          {hasChips && renderChips()}
        </GridWrapper>
      )
    case 'autocomplete':
      const onChangeAutocomplete = (e, d) => {
        if(props.multiple) {
          const selectedAValue = get(e, 'target.value', null) === 0 // 0 for selected value
          if(selectedAValue) {
            props.setFieldValue(name, d || [])
              .then(() => props.setFieldTouched(name, true, false))
          }
        } else {
          props.setFieldValue(name, d)
            .then(() => props.setFieldTouched(name, true, false))
        }
      }

      const handleChipDeleteAutoCompleteMultiple = (v) => () => {
        props.setFieldValue(name, [...get(values, name, []).filter(val => val.value !== v)])
         .then(() => props.setFieldTouched(name, true, false))
      }

      const renderChipsAutoCompleteMultiple = () => get(values, name, []).map((chip, i) => {
        return chip.value === -1 || chip.value === ''
          ? <Fragment key={i} />
          : <Chip
            className={chipClass}
            label={chip.label}
            key={i}
            onDelete={handleChipDeleteAutoCompleteMultiple(chip.value)}
            color='primary'
          />
      })
      return (
        <GridWrapper {...props}>
          <FormControl variant={variant} className={formControl} style={{ marginTop: 16, ...style }}>
            <InputAutocomplete {...defaultProps} grouped={grouped} onChange={onChangeAutocomplete} />
          </FormControl>
          {hasChips && renderChipsAutoCompleteMultiple()}
        </GridWrapper>
      )
    case 'asyncAutocomplete':
      const onChangeAsyncAutocomplete = (e, d) => {
        if (props.multiple) {
          const currentVals = get(values, name, [])
          const newVals = compact(uniqBy([...currentVals, ...d], 'value'))
          props.setFieldValue(name, newVals)
            .then(() => props.setFieldTouched(name, true))
        } else {
          props.setFieldValue(name, d)
            .then(() => props.setFieldTouched(name, true))
        }
      }

      const handleChipDelete3 = (v) => () => {
        props.setFieldTouched(name, true, false)
        props.setFieldValue(name, [...get(values, name, []).filter(val => val.value !== v)])
      }

      const renderChips3 = (): JSX.Element[] => compact(get(values, name, []).map(chip => {
        return !chip || chip.value === -1 || chip.value === ''
          ? null
          : <Chip
            className={chipClass}
            label={chip.label}
            key={uniqueId('asyncAutocompleteChip-')}
            onDelete={handleChipDelete3(chip.value)}
            color='primary'
          />
      }))

      return (
        <GridWrapper {...props}>
          <FormControl variant={variant} className={formControl} style={{ marginTop: 16, ...style }}>
            <InputAsyncAutocomplete {...defaultProps} onChange={onChangeAsyncAutocomplete} />
          </FormControl>
          {hasChips && renderChips3()}
        </GridWrapper>
      )
    case 'date':
      const onDateChange = e => {
        const v: string = e.target.value
        const isValidDate = dayjs(v).isValid()
        if (isValidDate) {
          const isoDate = dayjs(v).toISOString()
          props.setFieldTouched(name, true, false)
          props.setFieldValue(name, isoDate)
        }
      }
      const _v = dayjs(get(values, name, '')).isValid()
        ? dayjs(get(values, name, '')).format('YYYY-MM-DD')
        : ''
      return (
        <GridWrapper {...props}>
          <FormControl variant={variant} className={formControl} {...{ style }}>
            <TextField
              id={id}
              name={name}
              label={label}
              type='date'
              InputLabelProps={{
                shrink: true
              }}
              value={_v}
              onChange={onDateChange}
              margin='normal'
              disabled={disabled}
              helperText={helperText}
              error={!!get(errors, name, false)}
              variant={variant}
            />
            {get(errors, name, false) && <FormHelperText margin='dense' style={{ color: 'red' }} id={`${id}_error`}>{get(errors, name, '')}</FormHelperText>}
          </FormControl>
        </GridWrapper>
      )
    default:
      inputProps = { ...props.inputProps || {} }
      break
  }

  return (
    <GridWrapper {...props}>
      <FormControl variant={variant} className={formControl} {...{ style }}>
        <TextField
          id={id}
          name={name}
          label={label}
          type={type}
          placeholder={placeholder}
          className={textField}
          value={get(values, name, '') || ''}
          onChange={e => {
            props.setFieldTouched(name, true, false)
            handleChange(e)
            if (supplementaryOnChange) supplementaryOnChange(e.target.value)
          }}
          margin='normal'
          disabled={disabled}
          helperText={helperText}
          error={!!get(errors, name, false)}
          variant={variant}
          InputProps={inputProps}
          multiline={multiline}
          rows={rows}
        />
        {get(errors, name, false) && <FormHelperText margin='dense' style={{ color: 'red' }} id={`${id}_error`}>{get(errors, name, '')}</FormHelperText>}
      </FormControl>
    </GridWrapper>
  )
}

const GridWrapper = React.memo((props: GridWrapperProps) => {
  const { xs = 12, sm, md, lg, xl, container, spacing } = props
  const classes = useStyles()
  return <Grid className={classes.gridWrapper} item {...container && { container: true, spacing: spacing || 1 }} style={{ ...props.gridStyle || {} }} xs={xs} sm={sm || xs} md={md || sm || xs} lg={lg || sm || xs} xl={xl || lg || sm || xs}>
    {props.children || <></>}
  </Grid>
})

export default React.memo(FormikInput)
