import React from 'react'
import DashboardContainer from '@_page-containers/dashboard'
import PageTransition from '@_components/PageTransition'
import zenHooks from '@_utils/hooks'
import { ZenRouteID } from '@_utils/routes/types'

const Index = () => {
  zenHooks.app.useSetActivePage(ZenRouteID.DASHBOARD)

  return (
    <PageTransition>
      <DashboardContainer />
    </PageTransition>
  )
}

export default Index
