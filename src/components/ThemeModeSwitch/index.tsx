import React from 'react'
import { makeStyles, Switch, Theme } from '@material-ui/core'
import { useConfigStore } from '@_zustand/config'
import Brightness2RoundedIcon from '@material-ui/icons/Brightness2Rounded'
import { ConfigStore } from '@_zustand/config/helpers'

const useStyles = makeStyles((theme: Theme) => ({
  moon: {
    transform: 'rotateZ(145deg) translateY(0.1em) scale(1.1)',
    color: 'rgba(255,255,255,.75)',
    filter: 'drop-shadow(0px 0px 5px rgba(255,255,205,.75))',
    [theme.breakpoints.down('xs')]: {
      transform: 'rotateZ(145deg) translateY(0.1em)',
    }
  }
}))

const stateSelector = (state: ConfigStore) => ({
  themeType: state.themeType,
  toggleTheme: state.toggleTheme
})

const ThemeSwitch = () => {
  const { toggleTheme, themeType } = useConfigStore(stateSelector)
  const classes = useStyles()

  return (
    <Switch
      checked={themeType === 'dark'}
      color='primary'
      checkedIcon={<Brightness2RoundedIcon className={classes.moon} />}
      onChange={toggleTheme} />
  )
}

export default React.memo(ThemeSwitch)
