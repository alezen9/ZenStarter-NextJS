import React from 'react'
import PageTransition from '@_components/PageTransition'
import LoginContainer from '@_page-containers/auth/login'
import zenHooks from '@_utils/hooks'
import { ZenRouteID } from '@_utils/routes/types'

const Login = () => {
  zenHooks.app.useSetActivePage(ZenRouteID.LOGIN)

  return (
    <PageTransition>
      <LoginContainer />
    </PageTransition>
  )
}

export default React.memo(Login)
