import React from 'react'
import DashboardContainer from '@_page-containers/dashboard'
import PageTransition from '@_components/PageTransition'

const Index = props => {
  return (
    <PageTransition>
      <DashboardContainer />
    </PageTransition>
  )
}

export default Index
