import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  main: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '85vh',
    marginTop: '1em'
  },
  text: {
    fontSize: '5em',
    fontWeight: 'bold'
  }
}))

const DashboardContainer = () => {
  const classes = useStyles()

  return (
    <div className={classes.main}>
      <Typography className={classes.text} >This is the way!</Typography>
    </div>
  )
}

export default React.memo(DashboardContainer)
