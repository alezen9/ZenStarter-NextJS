import React, { useEffect, useCallback } from 'react'
import { makeStyles, List } from '@material-ui/core'
import { useRouter } from 'next/router'
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded'
import { ZenPalette } from '@_palette'
import { RouteItem } from '..'
import SingleItem from './SingleItem'
import ExpandableItem from './ExpandableItem'
import { routes, routesPaths } from '@_utils/routes'
import { ZenRoute, ZenRouteID } from '@_utils/routes/types'

const useStyles = makeStyles({
  root: {},
  subpaths: {},
  list: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left: 0,
    width: 250
  },
  logout: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  }
})

const LOGOUT_ITEM: RouteItem = {
   ...routesPaths[ZenRouteID.LOGIN],
   title: 'Logout',
   icon: <ExitToAppRoundedIcon style={{ color: ZenPalette.lightRed, opacity: 0.7 }} />
}

type Props = {
   items: RouteItem[]
   logout: (e: any) => void
}

const ItemList = (props: Props) => {
   const { items = [], logout } = props
   const router = useRouter()
   const classes = useStyles()

   useEffect(() => {
      router.prefetch('/login')
   }, [])

   const handleRoute = useCallback(path => () => {
      router.push(path)
   }, [])

   const _logout = useCallback(
      (path?: string) => (e: Event) => {
      e.preventDefault()
      logout(e)
   }, [logout])

   return (
      <>
         <div className={classes.list} >
         <List className={classes.root}>
            {items.map((item: RouteItem, i: number) => {
               return !item.subpaths || (item.subpaths && !item.subpaths.length)
               ? <SingleItem key={`main-path-${i}`} item={item} handleRoute={handleRoute} />
               : <ExpandableItem key={`main-path-${i}`} item={item} handleRoute={handleRoute} />
            })}
         </List>
         </div>
         <div className={classes.logout}>
         <SingleItem
            item={LOGOUT_ITEM}
            handleRoute={_logout}
            ignoreActiveProps
         />
         </div>
         </>
   )
}

export default React.memo(ItemList)
