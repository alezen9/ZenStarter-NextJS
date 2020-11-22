import { useConfigStore } from '@_zustand/configStore'
import { ConfigStore } from '@_zustand/helpers'
import React from 'react'
import { RouteItem } from '..'
import Navbar from './Navbar'

type Props = {
   items: RouteItem[]
   dropdown?: boolean
}

const stateSelector = (state: ConfigStore) => state.isLoading


const MobileMenu = (props: Props) => {
   const { items, dropdown = true } = props
   const isLoading = useConfigStore(stateSelector)
   return dropdown
      ? <Navbar items={items} isLoading={isLoading} />
      : <></>
}

export default React.memo(MobileMenu)
