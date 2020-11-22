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
  deadpool: {
    maxWidth: '70%',
    position: 'absolute',
    bottom: '-10vh',
    right: 0
  },
  text: {
    fontSize: '5em',
    fontWeight: 'bold'
  }
}))

const DashboardContainer = props => {
  const classes = useStyles()

  return (
    <div className={classes.main}>
      <Typography className={classes.text} >It's gonna be lit!</Typography>
    </div>
  )
}

export default React.memo(DashboardContainer)
