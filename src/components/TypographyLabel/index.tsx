import React, { CSSProperties } from 'react'
import { Grid, Typography, makeStyles } from '@material-ui/core'

type Props = {
   label?: any
   value?: any,
   sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
   valueStyle?: CSSProperties
}

const useStyles = makeStyles(theme => ({
  labelClass: {
    mixBlendMode: 'exclusion',
    fontWeight: 'bold'
  }
}))

const TypographyLabel: React.FC<Props> = props => {
  const { label = '', value = '', sm, valueStyle = {} } = props
  const classes = useStyles()

  return (
    <Grid item container xs={12} {...sm && { sm }}>
      <Grid item xs={12}>
        <Typography variant='caption' className={classes.labelClass}>{label}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='caption' style={valueStyle}>{value}</Typography>
      </Grid>
    </Grid>
  )
}

export default React.memo(TypographyLabel)
