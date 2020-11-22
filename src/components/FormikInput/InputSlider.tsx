import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import { get } from 'lodash'
import { ZenPalette } from '../../../palette'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  thumb: {
    '& > span > span': {
      color: `${ZenPalette.typographyGrey}`,
      backgroundColor: theme.type === 'dark'
        ? '#333'
        : `currentColor`
    }
  }
}))

const marks = [
  {
    value: 0
  },
  {
    value: 25
  },
  {
    value: 50
  },
  {
    value: 75
  },
  {
    value: 100
  }
]

type Props = {
  label: string
  values: any
  name: string
  onChange: (e: any, d: number) => void
}

const Inputslider = (props: Props) => {
  const { label, values, name, onChange } = props
  const classes = useStyles()
  const [localVal, setLocalVal]: [number, (v: number) => void] = useState(get(values, name, 0))

  useEffect(() => {
    if (![null, undefined].includes(get(values, name, null))) setLocalVal(get(values, name, 0))
  }, [get(values, name, null)])

  const onLocalChange = useCallback((e, d) => setLocalVal(d), [])

  return (
    <div className={classes.root}>
      <Typography gutterBottom>{label}</Typography>
      <Slider
        classes={{ thumb: classes.thumb }}
        marks={marks}
        value={localVal}
        onChange={onLocalChange}
        onChangeCommitted={onChange}
        valueLabelDisplay='auto' />
    </div>
  )
}

export default React.memo(Inputslider)
