import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import { useRouter } from 'next/router'
import { useConfigStore } from '@_zustand/configStore'
import { getTitleFromPathname } from '@_utils/helpers'

const Title = () => {
  const router = useRouter()
  const { pageTitle, setPageTitle } = useConfigStore(state => ({
    pageTitle: state.pageTitle,
    setPageTitle: state.setPageTitle
  }))

  useEffect(() => {
    const title = getTitleFromPathname(router.pathname)
    setPageTitle(title)
  }, [router.pathname])

  return (
    <Typography component='h2' variant='h6' color='primary' gutterBottom>
      {pageTitle}
    </Typography>
  )
}

export default React.memo(Title)
