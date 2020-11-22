import React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import { ZenPalette } from '@_palette'

const useStyles = makeStyles(theme => ({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: theme.type === 'dark'
      ? '#111'
      : '#fafafa',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  verticalDivider: {
    width: 2,
    height: '3.7rem',
    backgroundColor: ZenPalette.typographyGrey,
    opacity: '.5',
    margin: '0 1em'
  }
}))

const Custom404 = props => {
  const classes = useStyles()
  return (
    <Grid className={classes.container} container justify='center' alignContent='center'>
      <div className={classes.item}>
        <Typography variant='h1'>404</Typography>
        <div className={classes.verticalDivider} />
        <Grid item>
          <Typography variant='body1'>Page</Typography>
          <Typography variant='body1'>Not found</Typography>
        </Grid>
      </div>
    </Grid>
  )
}

export default React.memo(Custom404)
