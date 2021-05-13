import { useConfigStore } from '@_zustand/config'
import { ConfigStore } from '@_zustand/config/helpers'
import React from 'react'
import { logoutFn, RouteItem } from '..'
import Navbar from './Navbar'

type Props = {
   items: RouteItem[]
   logout: logoutFn
}

const stateSelector = (state: ConfigStore) => state.isLoading


const MobileMenu = (props: Props) => {
   const { items, logout } = props
   const isLoading = useConfigStore(stateSelector)
   return <Navbar items={items} isLoading={isLoading} logout={logout} />
}

export default React.memo(MobileMenu)
