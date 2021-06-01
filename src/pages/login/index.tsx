import React from 'react'
import PageTransition from '@_components/PageTransition'
import zenHooks from '@_utils/hooks'
import { ZenRouteID } from '@_utils/routes/types'
import LoginContainer from '@_page-containers/auth/login'

const Login = () => {
  zenHooks.app.useSetActivePage(ZenRouteID.LOGIN)

  return (
    <PageTransition>
      <LoginContainer />
    </PageTransition>
  )
}

export default React.memo(Login)
