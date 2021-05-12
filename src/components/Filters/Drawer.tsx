import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Divider, Grid, IconButton, SwipeableDrawer, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { FormikEssentials } from '@_components/FormikInput'
import { ZenPalette } from '@_MUITheme'
import Inputs, { Filter } from './Inputs'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import BackspaceRoundedIcon from '@material-ui/icons/BackspaceRounded'

const borderRadius = 10

const useStyles = makeStyles(theme => ({
  paper: {
    width: 370,
    borderTopLeftRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    padding: '1em',
    [theme.breakpoints.down('sm')]: {
      minHeight: 200,
      maxHeight: '90vh',
      width: 'auto',
      borderBottomLeftRadius: 0,
      borderTopRightRadius: borderRadius
    }
  },
  draggable: {
    width: 40,
    height: 4,
    borderRadius: 5,
    margin: '.2em auto .5em auto',
    backgroundColor: ZenPalette.typographyGrey
  },
  container: {
    height: '100%',
    overflowY: 'scroll'
  },
  actions: {
    height: 100
  },
  inputs: {
    overflowY: 'scroll',
    height: 'calc(100% - 110px)',
    maxHeight: 'calc(100vh - 110px)',
    [theme.breakpoints.down('sm')]: {
      maxHeight: 'calc(90vh - 100px)',
    }
  }
}))

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

type Props = {
  open: boolean
  toggleDrawer: (e?: any) => void
  formik: FormikEssentials & { handleSubmit: any, handleReset: any }
  filters?: Filter[]
  excludeSearchBoxFromFilters?: boolean
}

const FiltersDrawer = (props: Props) => {
  const { open, toggleDrawer, formik, filters = [], excludeSearchBoxFromFilters } = props
  const classes = useStyles();
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleSubmit = useCallback(() => {
    toggleDrawer()
    formik.handleSubmit()
  }, [formik.handleSubmit, toggleDrawer])

  const handleReset = useCallback(() => {
    toggleDrawer()
    formik.handleReset()
    formik.handleSubmit()
  }, [formik.handleSubmit, formik.handleReset, toggleDrawer])

  return (
    <SwipeableDrawer
      anchor={isMobile ? 'bottom' : 'right'}
      open={open}
      onClose={toggleDrawer}
      onOpen={toggleDrawer}
      disableBackdropTransition={!iOS}
      disableDiscovery
      disableSwipeToOpen
      classes={{
        paper: classes.paper
      }}
    >
      <>
        {isMobile && <div className={classes.draggable} />}
        <Grid container spacing={1} className={classes.container}>
          <Grid item xs={12} container className={classes.inputs} alignContent='flex-start'>
            {!excludeSearchBoxFromFilters && <Grid item xs={12}>
              <Typography variant='caption' style={{ display: 'flex' }}>
                <InfoOutlinedIcon style={{ fontSize: '1.4em', marginRight: '.5em', transform: 'translateY(.1em)' }} />
                La box di ricerca esterna viene combinata ai filtri sottostanti
              </Typography>
            </Grid>}
            <Inputs filters={filters} formik={formik} />
          </Grid>
          <Grid item xs={12} container justify='space-around' alignItems='center' className={classes.actions}>
            <Grid item>
              {false
                ? <IconButton color='primary'>
                  <BackspaceRoundedIcon />
                </IconButton>
                : <Button onClick={handleReset} variant='outlined' color='primary'>Reset</Button>}
            </Grid>
            <Divider style={{ margin: 'auto .5em', height: '55%' }} orientation="vertical" flexItem />
            <Grid item>
              <Button onClick={handleSubmit} variant='contained' color='primary'>Applica</Button>
            </Grid>
          </Grid>
        </Grid>
      </>
    </SwipeableDrawer>
  );
}

export default React.memo(FiltersDrawer)