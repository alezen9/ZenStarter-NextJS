import React, { useMemo } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { sortBy, get } from 'lodash'
import { makeStyles, FormHelperText, ListSubheader } from '@material-ui/core'
import { ZenPalette } from '@_palette'
import { VariableSizeList } from 'react-window'
import { OptionType } from '.'
import { matchSorter } from 'match-sorter'
// import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined'

// const IGNORE_OPTION: OptionType = {
//   value: '_ignoreField',
//   label: 'Ignora campo',
//   component: <span style={{ display: 'flex', alignItems: 'center', color: 'darkred' }}>
//     <VisibilityOffOutlinedIcon style={{ marginRight: '1em' }} />
//     Ignora campo
//   </span>
// }

const useStyles = makeStyles(theme => ({
  listbox: (props: any) => ({
    padding: '.5em',
    ...props.large && {
      '& > ul': {
        margin: 0
      }
    }
  }),
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

type Props = {
  options?: OptionType[]
  label: string
  id?: string
  name: string
  required?: boolean
  disabled?: boolean
  errors: any
  onChange: (e: any, d: any) => void
  large?: boolean
  sortByLabel?: boolean
  multiple?: boolean
  grouped?: boolean
  values: any
}

const filterOptions = (options: OptionType[], { inputValue }) => matchSorter(options, inputValue, { keys: ['label'] })


const InputAutocomplete = (props: Props) => {
  const {
    options = [],
    grouped,
    label,
    id,
    name,
    values,
    disabled,
    errors,
    onChange,
    sortByLabel = true,
    multiple = false,
    large = false
  } = props
  const classes = useStyles({ error: !!get(errors, name, false), large })

  const optionsToRender = useMemo(() => {
    const valuesKeys = multiple
      ? (get(values, name, []) || []).map(({ value }) => value)
      : [get(values, `${name}.value`, null)]
    return sortByLabel
      ? sortBy(options.filter(({ value }) => !valuesKeys.includes(value)), ['label'])
      : options.filter(({ value }) => !valuesKeys.includes(value))
  }, [JSON.stringify(get(values, name, null)), JSON.stringify(options), multiple, sortByLabel])

  return (
    <>
      {/* @ts-ignore */}
      <Autocomplete
        id={id}
        multiple={multiple}
        freeSolo
        disabled={disabled}
        classes={classes}
        {...grouped && !large && {
          groupBy: option => option.label[0].toUpperCase()
        }}
        value={get(values, name, multiple ? [] : null)}
        options={optionsToRender}
        onChange={onChange}
        filterOptions={filterOptions}
        ChipProps={{ style: { display: 'none' } }}
        getOptionLabel={option => option.label || ''}
        renderOption={option => get(option, 'component', option.label || '')}
        {...large && { ListboxComponent }}
        renderInput={params => <TextField {...params} placeholder='Search . . .' label={label} variant='outlined' />}
      />
      {get(errors, name, false) && <FormHelperText margin='dense' style={{ color: 'red', margin: '12px 14px 0 14px' }} id={`${id}_error`}>{get(errors, name, '')}</FormHelperText>}
    </>
  )
}

export default React.memo(InputAutocomplete)

const LISTBOX_PADDING = 8

type RowProps = {
  data: any[]
  index: number
  style: any
}

const renderRow = (props: RowProps) => {
  const { data, index, style } = props
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING
    }
  })
}

const OuterElementContext = React.createContext({})

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext)
  // @ts-ignore
  return <div ref={ref} {...props} {...outerProps} />
})

const useResetCache = data => {
  const ref = React.useRef(null)
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true)
    }
  }, [data])
  return ref
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent (props, ref) {
  const { children, ...other } = props
  const itemData = React.Children.toArray(children)
  const itemCount = itemData.length
  const itemSize = 52

  const getChildSize = (child) => {
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 52
    }
    return itemSize
  }

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0)
  }

  const gridRef = useResetCache(itemCount)

  return (
    // @ts-ignore
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width='100%'
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType='ul'
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  )
})
