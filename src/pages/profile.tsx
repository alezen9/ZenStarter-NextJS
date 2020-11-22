import React, { useRef, useEffect } from 'react'
import ProfileContainer from '@_page-containers/profile'
import PageTransition from '@_components/PageTransition'

const Profile = props => {
  const isMounted = useRef(true)
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])
  return (
    <PageTransition>
      <ProfileContainer
        {...props}
        isMounted={isMounted.current} />
    </PageTransition>
  )
}

export default Profile
