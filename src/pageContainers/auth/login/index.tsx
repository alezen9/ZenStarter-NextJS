import React, { useCallback, useEffect } from 'react'
import { Button, Grid, makeStyles } from '@material-ui/core'
import FormikInput from '@_components/FormikInput'
import ThemeModeSwitch from '@_components/ThemeModeSwitch'
import { useConfigStore } from '@_zustand/config'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import Copyright from '../Copyright'
import { schema, onLogin } from './helpers'
import { useSharedStyles, stateSelector } from '../helpers'
import { routesPaths } from '@_utils/routes'
import { ZenRouteID } from '@_utils/routes/types'
import AcUnitRoundedIcon from '@material-ui/icons/AcUnitRounded'

const useLocalStyles = makeStyles(theme => ({
  card: {
    // background: 'red'
  }
}))

const LoginContainer = () => {
  const { openSnackbar, setIsLoading, setIsLogged } = useConfigStore(stateSelector)
  const router = useRouter()

  useEffect(() => {
    setIsLoading(false)
  }, [setIsLoading])

  const goToHome = useCallback(() => {
    router.push(routesPaths[ZenRouteID.DASHBOARD].path)
  }, [router.push])

  const formik = useFormik({
    initialValues: {},
    validationSchema: schema,
    onSubmit: onLogin({ openSnackbar, setIsLoading, setIsLogged, goToHome })
  })

  const classes = useSharedStyles({ isSubmitting: formik.isSubmitting })
  const localClasses = useLocalStyles()

  return (
    <Grid container justify='space-between' alignItems='center' direction='column' className={classes.main}>
      <div className={classes.themeToggleClass}>
        <ThemeModeSwitch />
      </div>
      <AcUnitRoundedIcon className={classes.logo} />
      <Grid className={localClasses.card} container direction='column' alignItems='center' item xs={12} sm={6} style={{ marginTop: '10vh' }}>
        <AcUnitRoundedIcon style={{ fontSize: '4em' }} />
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <FormikInput
            name='username'
            label='Username'
            required
            {...formik} />
          <FormikInput
            name='password'
            label='Password'
            type='password'
            required
            {...formik} />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            disabled={formik.isSubmitting}
            className={classes.submit}>
            Login
          </Button>
        </form>
      </Grid>
      <Copyright />
    </Grid>
  )
}

export default LoginContainer
