import React from 'react'
import { Checkbox, makeStyles } from '@material-ui/core'
import { ZenPalette } from '@_MUITheme'
import { get } from 'lodash'

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  rootCheckbox: {
    color: ZenPalette.typographyGrey
  }
}))

type Props = {
  name: string
  onChange: (e: any, d: boolean) => void
  values: any
  icon?: React.ReactNode
  checkedIcon?: React.ReactNode
  disabled?: boolean
}

const InputCheckbox = (props: Props) => {
  const { name, onChange, values, icon, checkedIcon, disabled } = props
  const classes = useStyles()
  return (
    <div className={classes.wrapper}>
      <Checkbox
        {...icon && { icon }}
        {...checkedIcon && { checkedIcon }}
        classes={{ root: classes.rootCheckbox }}
        name={name}
        disabled={disabled}
        checked={!!get(values, name, false)}
        onChange={onChange}
        color='primary'
      />
    </div>
  )
}

export default React.memo(InputCheckbox)
