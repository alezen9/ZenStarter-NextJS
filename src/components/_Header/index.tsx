import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import Menu from './Menu'
import SearchBar from './SearchBar'
import TopBar from './TopBar'

// xs, sm, md, lg, xl <=

const useStyles = makeStyles(theme => ({
  containerElisa: {
    background: 'red'
  }
}))

const _Header = () => {
  const classes = useStyles()
  return (
    <Grid container className={classes.containerElisa}>
      <TopBar />
      <Menu />
      <SearchBar />
    </Grid>
  )
}

export default _Header
