import React from 'react'
import DashboardContainer from '@_page-containers/dashboard'
import PageTransition from '@_components/PageTransition'
import { zenHooksInstance } from '@_utils/hooks'
import { ZenRouteID } from '@_utils/routes/types'

const Index = () => {
  zenHooksInstance.useSetActivePage(ZenRouteID.DASHBOARD)

  return (
    <PageTransition>
      <DashboardContainer />
    </PageTransition>
  )
}

export default Index
