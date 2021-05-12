import React, { ReactElement } from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { ZenPalette } from '@_MUITheme'
import { isArray } from 'lodash'

const useStyles = makeStyles(theme => ({
   container: {
      background: ZenPalette.backgroundColorStandOut,
      boxShadow: ZenPalette.boxShadow,
      borderRadius: 5,
      [theme.breakpoints.up('sm')]: {
         padding: theme.spacing(3)
      }
   },
   action: {
      [theme.breakpoints.up('sm')]: {
         marginLeft: 'auto'
      }
   }
}))

type Props = {
   children: ReactElement | ReactElement[]
   className?: string
}

const GridCard: React.FC<Props> = props => {
   const { children, className = '' } = props
   const classes = useStyles()
   return (
      <Grid className={`${classes.container} ${className}`} container justify='center' spacing={2}>
         {isArray(children)
            ? children.map((child, i) => React.cloneElement(child, { key: `grid-card-${i}` }))
            : children}
      </Grid>
   )
}

export default React.memo(GridCard)
