import React, { useMemo } from 'react'
import { ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import { useRouter } from 'next/router'
import { checkActivePage } from './helpers'
import { RouteItem } from '..'

const useStyles = makeStyles({
  listItem: {
    height: '4rem'
  }
})

export type Props = {
   item: RouteItem
   iconStaticProps?: any
   ignoreActiveProps?: boolean
   handleRoute: (path?: string) => (e?: any) => void | Promise<void>
}

const SingleItemList = (props: Props) => {
   const { item, handleRoute, iconStaticProps = {}, ignoreActiveProps = false } = props
   const router = useRouter()
   const classes = useStyles()

   const activeProps = useMemo(() => {
      if(ignoreActiveProps) return {}
      return { ...checkActivePage(router.pathname, item.path) && { color: 'primary' } }
   }, [router.pathname, item.path])

   return <ListItem className={classes.listItem} button onClick={handleRoute(item.path)}>
      <ListItemIcon {...iconStaticProps}>
         {React.cloneElement(item.icon, activeProps)}
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ ...activeProps }} primary={item.title} />
   </ListItem>
}

export default React.memo(SingleItemList)