import React, { useCallback, useEffect } from 'react'
import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import { ZenPalette } from '@_MUITheme'
import { useConfigStore } from '@_zustand/config'
import { useRouter } from 'next/router'
import { ZenRouteID } from '@_utils/routes/types'
import { routesPaths } from '@_utils/routes'

const useStyles = makeStyles(theme => ({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: ZenPalette.backgroundColor,
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    marginBottom: '2em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  verticalDivider: {
    width: 2,
    height: '3.7rem',
    backgroundColor: ZenPalette.typographyGrey,
    opacity: '.5',
    margin: '0 1em'
  }
}))

const Error = props => {
  const { statusCode } = props
  const classes = useStyles()
  const setActiveRoute = useConfigStore(state => state.setActiveRoute)
  const router = useRouter()

  useEffect(() => {
    setActiveRoute(ZenRouteID.ERROR)
  }, [setActiveRoute])

  const goBackToSafety = useCallback(() => {
    const homePath = routesPaths[ZenRouteID.HOME].path
    router.push(homePath)
  }, [router.push])

  return (
    <Grid className={classes.container} container direction='column' justify='center' alignContent='center'>
      <div className={classes.item}>
        <Typography variant='h1'>{statusCode || '000'}</Typography>
        <div className={classes.verticalDivider} />
        <Grid item>
          <Typography variant='body1'>{statusCode === 404 ? 'Page' : 'Oops!'}</Typography>
          <Typography variant='body1'>
            {statusCode === 404 ? 'Not found' : 'This is (not) the way!'}
          </Typography>
        </Grid>
      </div>
      <Grid item>
        <Button color='primary' onClick={goBackToSafety}>
          Riportame accasa va!
        </Button>
      </Grid>
    </Grid>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
