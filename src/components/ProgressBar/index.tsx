import React from 'react'
import { makeStyles, LinearProgress } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  progressBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: 4,
    zIndex: 20
  }
}))

const ProgressBar = () => {
  const classes = useStyles()
  return <LinearProgress className={classes.progressBar} />
}

export default React.memo(ProgressBar)
