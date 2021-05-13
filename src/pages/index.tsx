import React, { useEffect } from 'react'
import DashboardContainer from '@_page-containers/dashboard'
import PageTransition from '@_components/PageTransition'
import zenHooks from '@_utils/hooks'
import { ZenRouteID } from '@_utils/routes/types'
import { useDispatch } from 'react-redux'
import { route_setActive } from 'src/_redux/Modules/Route/Actions'

const Index = () => {
  // zustand
  zenHooks.app.useSetActivePage(ZenRouteID.DASHBOARD)

  // redux
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(route_setActive(ZenRouteID.DASHBOARD))
  }, [dispatch])

  return (
    <PageTransition>
      <DashboardContainer />
    </PageTransition>
  )
}

export default Index
