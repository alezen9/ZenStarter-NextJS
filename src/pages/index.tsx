import React from 'react'
import DashboardContainer from '@_page-containers/home'
import PageTransition from '@_components/PageTransition'
import zenHooks from '@_utils/hooks'
import { ZenRouteID } from '@_utils/routes/types'

const Index = () => {
  // zustand
  zenHooks.app.useSetActivePage(ZenRouteID.HOME)

  return (
    <PageTransition>
      <DashboardContainer />
    </PageTransition>
  )
}

export default Index
