import React from 'react'
import { makeStyles, Typography, TypographyProps } from '@material-ui/core'
import { ZenPalette } from '@_MUITheme'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'

const useStyles = makeStyles(theme => ({
   infoIcon: {
      marginRight: '.5em',
      color: ZenPalette.infoColor,
      transform: 'translateY(.25em)'
   }
}))

const InfoTypography = (props: TypographyProps) => {
   const { children, variant = 'caption', ...rest } = props
   const classes = useStyles()
   return (
      <Typography variant={variant} {...rest}>
         <InfoOutlinedIcon className={classes.infoIcon} />
         {children}
      </Typography>
   )
}

export default React.memo(InfoTypography)
