import React, { useState, useCallback, useEffect } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng
} from 'react-places-autocomplete'
import { TextField, Grid, makeStyles, IconButton, Popover, Typography, Divider, FormHelperText } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { get, isEqual, uniqueId, isEmpty, cloneDeep } from 'lodash'
import FormikInput from '.'
import RoomRoundedIcon from '@material-ui/icons/RoomRounded'
import InfoRoundedIcon from '@material-ui/icons/InfoRounded'
import { ZenPalette } from '@_MUITheme'

/**
 * ADDRESS
  geoPoint: CXGeoPoint;
  via: string;
  civico: string;
  civicoN: number;
  provincia: string;
  comune: string;
  CAP: string;
  indirizzoCompleto: string;
 */

const AddressMap = {
  street_number: {
    name: 'civico',
    property: 'short_name'
  },
  locality: {
    name: 'citta',
    property: 'long_name'
  },
  route: {
    name: 'via',
    property: 'short_name'
  },
  country: {
    name: 'stato',
    property: 'long_name'
  },
  administrative_area_level_1: {
    name: 'regione',
    property: 'long_name'
  },
  administrative_area_level_2: {
    name: 'provincia',
    property: 'short_name'
  },
  administrative_area_level_3: {
    name: 'comune',
    property: 'long_name'
  },
  postal_code: {
    name: 'CAP',
    property: 'short_name'
  }
}

const useStyles = makeStyles(theme => ({
  singleOption: {
    display: 'flex',
    alignItems: 'center'
  },
  tooltipInfo: {
    position: 'absolute',
    top: -15,
    right: -15,
    zIndex: 2,
    '& > span > svg': {
      borderRadius: '50%',
      backdropFilter: 'blur(20px)'
    }
  },
  tooltipShowAllFields: {
    position: 'absolute',
    top: 38,
    right: -15,
    zIndex: 2,
    '& > span > svg': {
      borderRadius: '50%',
      backdropFilter: 'blur(20px)'
    }
  },
  popoverClass: {
    width: 250,
    padding: 16,
    color: ZenPalette.typographyGrey
  }
}))

const useStylesAutocomplete = makeStyles(theme => ({
  root: {
    '& > div > label': {
      color: (props: any) => props.error
        ? '#ff443a'
        : ZenPalette.borderColor
    }
  },
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

type OptionRendererProps = {
  label: any
}

const OptionRenderer = React.memo((props: OptionRendererProps) => {
  const { label } = props
  const classes = useStyles()
  return <div className={classes.singleOption}>
    <RoomRoundedIcon style={{ marginRight: '1em', fontSize: '1em' }} />
    {label}
  </div>
})

type InfoPopoverProps = {
  anchorEl?: null | Element | ((element: Element) => Element)
  handleClose: VoidFunction
}

const InfoPopover = React.memo((props: InfoPopoverProps) => {
  const { anchorEl, handleClose } = props
  const classes = useStyles()
  return <Popover
    classes={{
      paper: classes.popoverClass
    }}
    open={!!anchorEl}
    anchorEl={anchorEl}
    onClose={handleClose}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left'
    }}
    transformOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
  >
    <Typography variant='body2' style={{ fontSize: '.8em' }}>
      Per una migliore ricerca separare i dati con una virgola.
    </Typography>
    <Divider light style={{ margin: '.5em 0' }} />
    <Typography variant='caption' style={{ fontSize: '.7em' }}>
      Esempio:
    </Typography>
    <br />
    <Typography variant='caption' style={{ fontSize: '.7em' }}>
      Via..., civico, comune, provincia, CAP
    </Typography>
    <br />
    <Typography variant='caption' style={{ fontSize: '.7em', fontWeight: 'bold', letterSpacing: '.07em' }}>
      Via..., 11, Roma, RM, 00123
    </Typography>
  </Popover>
})

type Props = {
  name: string
  label?: any
  placeholder?: string
  values: any,
  onChange: any
  errors: any
  setFieldError: any
  formik: any
  inputGridProps?: {
    [field: string]: any
  }
}

const InputAddressAutoComplete = (props: Props) => {
  const {
    name,
    label = '',
    placeholder = '',
    values,
    inputGridProps = {
      fullAddress: { sm: 12 },
      CAP: { sm: 3 },
      via: { sm: 4 },
      civico: { sm: 2 },
      comune: { sm: 3 }
    },
    onChange,
    formik,
    errors,
    setFieldError
  } = props
  const classes = useStylesAutocomplete({ error: !isEmpty(get(errors, name, false)) })
  const generalClasses = useStyles()
  const [addressValue, setAddressValue] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const [initValueSet, setInitValueSet] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => {
      setIsMounted(false)
      setInitValueSet(false)
    }
  }, [])

  useEffect(() => {
    if (!initValueSet) {
      if (get(values, `${name}.indirizzoCompleto`, null)) {
        const getAddress = async address => {
          try {
            const results = await geocodeByAddress(address)
            const res = get(results, '0', null)
            if (!res) throw new Error('Indirizzo non riconosciuto')
            const splittedValues = await splitAddress(res)
            if (isMounted) {
              setAddressValue(splittedValues.indirizzoCompleto || '')
              onChange(splittedValues)
              setInitValueSet(true)
            }
          } catch (error) {
            console.warn(error)
          }
        }
        getAddress(get(values, `${name}.indirizzoCompleto`, ''))
      }
    }
  }, [initValueSet, get(values, `${name}.indirizzoCompleto`, null), isMounted])

  const handleSelectAutocomplete = async (e, d) => {
    try {
      if (d) {
        const results = await geocodeByPlaceId(d.value)
        const res = get(results, '0', null)
        if (!res) throw new Error('no_results')
        const splittedValues = await splitAddress(res, false)
        setAddressValue(splittedValues.indirizzoCompleto)
        onChange(splittedValues)
      } else {
        onChange({})
      }
    } catch (error) {
      console.error(error)
    }
  }

  const splitAddress = useCallback(
    async (_address, useInitialValues = true) => {
      try {
        const { lat, lng } = await getLatLng(_address)
        const geoPoint = {
          type: 'Point',
          coordinates: [lat, lng]
        }
        const { address_components: addressComponents, formatted_address: formattedAddress } = _address
        const formatted = addressComponents.reduce((acc, val) => {
          val.types.forEach(type => {
            if (AddressMap[type]) {
              acc[AddressMap[type].name] = val[AddressMap[type].property]
            }
          })
          return acc
        }, {})
        return {
          ...useInitialValues && cloneDeep(get(values, name, {})),
          ...formatted,
          indirizzoCompleto: formattedAddress,
          geoPoint
        }
      } catch (error) {
        throw error
      }
    }, [name, JSON.stringify(values)])

  const showInfo = useCallback(e => setAnchorEl(e.currentTarget), [])

  return (
    <>
      <Grid item xs={12} {...get(inputGridProps, 'fullAddress', {})} style={{ marginTop: 16, position: 'relative' }}>
        <IconButton className={generalClasses.tooltipInfo} onClick={showInfo}>
          <InfoRoundedIcon />
        </IconButton>
        <InfoPopover anchorEl={anchorEl} handleClose={() => setAnchorEl(null)} />
        <PlacesAutocomplete
          value={addressValue}
          onChange={setAddressValue}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
            return (<div>
              <Autocomplete
                classes={classes}
                freeSolo
                inputValue={addressValue}
                onChange={handleSelectAutocomplete}
                onInputChange={(e, d) => {
                  if (!d && e) onChange({})
                }}
                options={suggestions.map(({ description, placeId }) => ({ label: description, value: placeId }))}
                getOptionLabel={option => option.label}
                renderOption={(option, state) => <OptionRenderer {...option} />}
                getOptionSelected={(opt, state) => isEqual(opt, state)}
                renderInput={params => <TextField {...getInputProps({ placeholder })} {...params} label={label} variant='outlined' />}
              />
            </div>)
          }}
        </PlacesAutocomplete>
        {/* {!isEmpty(get(errors, name, false)) && <FormHelperText margin='dense' style={{ color: 'red', margin: '12px 14px 0 14px' }} id={`${uniqueId('address-')}_error`}>{get(errors, `${name}.indirizzoCompleto`, null) || get(errors, `${name}.civico`, null)}</FormHelperText>} */}
        {get(errors, `${name}.indirizzoCompleto`, null) && <FormHelperText margin='dense' style={{ margin: '12px 14px 0 14px' }} id={`${uniqueId('address-')}_error`}>{get(errors, `${name}.indirizzoCompleto`, null)}</FormHelperText>}
      </Grid>
      <Grid item container xs={12} spacing={2} style={{ padding: 0, margin: '-16px auto' }} >
        <FormikInput
          name={`${name}.CAP`}
          label='CAP'
          required
          style={{ marginTop: 0 }}
          {...formik}
          {...get(inputGridProps, 'CAP', {})}
        />
        <FormikInput
          name={`${name}.via`}
          label='Via'
          required
          style={{ marginTop: 0 }}
          {...formik}
          {...get(inputGridProps, 'via', {})}
        />
        <FormikInput
          name={`${name}.civico`}
          label='Civico'
          required
          style={{ marginTop: 0 }}
          {...formik}
          {...get(inputGridProps, 'civico', {})}
        />
        <FormikInput
          name={`${name}.comune`}
          label='Comune'
          required
          style={{ marginTop: 0 }}
          {...formik}
          {...get(inputGridProps, 'comune', {})}
        />
      </Grid>
    </>
  )
}

export default React.memo(InputAddressAutoComplete)
