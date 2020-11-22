import React, { useEffect, useCallback } from 'react'
import { makeStyles, List } from '@material-ui/core'
import { useRouter } from 'next/router'
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded'
import { apiInstance } from 'src/SDK'
import { ZenPalette } from '@_palette'
import { useConfigStore } from '@_zustand/configStore'
import { RouteItem } from '..'
import SingleItem from './SingleItem'
import { ConfigStore } from '@_zustand/helpers'
import ExpandableItem from './ExpandableItem'

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

const stateSelector = (state: ConfigStore) => state.setIsLogged

const LOGOUT_ITEM: RouteItem = {
   _id: 'LOGOUT',
   title: 'Logout',
   path: '/login',
   icon: <ExitToAppRoundedIcon style={{ color: ZenPalette.lightRed, opacity: 0.7 }} />
}

type Props = {
   items: RouteItem[]
}

const ItemList = (props: Props) => {
   const { items } = props
   const router = useRouter()
   const setIsLogged = useConfigStore(stateSelector)
   const classes = useStyles()

   useEffect(() => {
      router.prefetch('/login')
   }, [])

   const handleRoute = useCallback(path => () => {
      router.push(path)
   }, [])

   const afterLogout = useCallback(() => {
      router.push('/login')
         .then(() => {
            setIsLogged(false)
         })
   },[])

   const logout = useCallback(
      (path?: string) => (e: Event) => {
      e.preventDefault()
      apiInstance.user_logout(afterLogout)
   }, [])

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
            handleRoute={logout}
            ignoreActiveProps
         />
         </div>
         </>
   )
}

export default React.memo(ItemList)
