import React from 'react'
import { makeStyles, Switch } from '@material-ui/core'
import { ZenPalette } from '../../../palette'
import { get } from 'lodash'

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  rootCheckbox: {
    color: ZenPalette.typographyGrey
  },
  track: {
    ...theme.type === 'dark' && {
      backgroundColor: 'rgba(255,255,255,.5)'
    }
  }
}))

type Props = {
  name: string
  onChange: (e: any, d: boolean) => void
  values: any
}

const InputSwitch = (props: Props) => {
  const { name, onChange, values } = props
  const classes = useStyles()
  return (
    <div className={classes.wrapper}>
      <Switch
        classes={{ root: classes.rootCheckbox, track: classes.track }}
        name={name}
        checked={get(values, name, false)}
        onChange={onChange}
        color='primary'
      />
    </div>
  )
}

export default React.memo(InputSwitch)
