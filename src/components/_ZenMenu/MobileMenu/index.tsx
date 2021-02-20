import { useConfigStore } from '@_zustand/config'
import { ConfigStore } from '@_zustand/config/helpers'
import React from 'react'
import { logoutFn, RouteItem } from '..'
import Navbar from './Navbar'

type Props = {
   items: RouteItem[]
   logout: logoutFn
   dropdown?: boolean
}

const stateSelector = (state: ConfigStore) => state.isLoading


const MobileMenu = (props: Props) => {
   const { items, logout, dropdown = true } = props
   const isLoading = useConfigStore(stateSelector)
   return dropdown
      ? <Navbar items={items} isLoading={isLoading} logout={logout} />
      // : <DrawerMenu /> // To be completed
      : <></>
}

export default React.memo(MobileMenu)
