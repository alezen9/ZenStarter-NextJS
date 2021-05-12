import React, { useMemo } from 'react'
import { ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import { useRouter } from 'next/router'
import { checkActivePage } from './helpers'
import { RouteItem } from '..'
import { CSSProperties } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
   listItem: {
      position: 'relative',
      height: '3.5rem',
      '&:after': {
         position: 'absolute',
         content: '""',
         width: 2,
         height: '100%',
         top: '50%',
         left: 0,
         transform: 'translate(0, -50%)',
         background: theme.palette.primary.main,
         opacity: (props: any) => props.showBorder ? 1 : 0,
         transition: 'opacity .1s ease-in-out'
      }
   }
}))

export type Props = {
   item: RouteItem
   iconStaticProps?: any
   ignoreActiveProps?: boolean
   isLogout?: boolean
   handleRoute: (path?: string) => (e?: any) => void | Promise<void>
}

const SingleItemList = (props: Props) => {
   const { item, handleRoute, iconStaticProps = {}, ignoreActiveProps = false, isLogout = false } = props
   const router = useRouter()

   const activeProps = useMemo<{ color?: 'primary' | 'error', style?: CSSProperties }>(() => {
      if (ignoreActiveProps) return { ...isLogout && { color: 'error' } }
      return { ...checkActivePage(router.pathname, item.path) && { color: 'primary' } }
   }, [router.pathname, item.path, ignoreActiveProps, isLogout])

   const classes = useStyles({ showBorder: activeProps.color === 'primary' })


   return <ListItem className={classes.listItem} button onClick={handleRoute(item.path)}>
      <ListItemIcon {...iconStaticProps}>
         {React.cloneElement(item.icon, activeProps)}
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ ...activeProps }} primary={item.title} />
   </ListItem>
}

export default React.memo(SingleItemList)