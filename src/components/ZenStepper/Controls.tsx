import React, { ReactElement } from 'react'
import { Button, Grid, IconButton, makeStyles, MobileStepper, useMediaQuery } from '@material-ui/core'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded'
import DoneAllRoundedIcon from '@material-ui/icons/DoneAllRounded'
import { useConfigStore } from '@_zustand/configStore'
import { ConfigStore } from '@_zustand/helpers'
import { ZenPalette } from '@_palette'

type Props = {
   handleBack: VoidFunction
   handleNext: VoidFunction
   handleReset: VoidFunction
   activeStep: number
   nSteps: number
   disableNext?: boolean
   disablePrev?: boolean
   resetButton?: ReactElement
}

const useStyles = makeStyles(theme => ({
   gridContainer: {
      position: 'fixed',
      background: ZenPalette.backgroundColor,
      right: 0,
      bottom: 0,
      zIndex: 1,
      transition: 'background .1s ease',
      width: (props: any) => `calc(100% - ${props.isMenuOpen ? 250 : 60}px)`,
      ['@media (max-width: 850px)']: {
         width: '100% !important'
      }
   },
   mobileRoot: {
      background: 'transparent',
      backdropFilter: 'blur(20px)',
      margin: 'auto',
      width: '60%',
      ['@media (max-width: 850px)']: {
         width: '100% !important'
      }
   },
   mobileDots: {
      width: '30%',
      justifyContent: 'space-evenly',
      ['@media (max-width: 850px)']: {
         width: '100% !important',
         justifyContent: 'center'
      }
   },
   endBtnContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '.5em'
   }
}))

const selectorConfigStore = (state: ConfigStore) => state.menuOpen

const Controls = (props: Props) => {
   const { handleBack, handleNext, handleReset, nSteps, activeStep, disableNext, disablePrev, resetButton } = props
   const isMenuOpen = useConfigStore(selectorConfigStore)
   const classes = useStyles({ isMenuOpen })
   const isSmallScreen = useMediaQuery('(max-width: 850px)')
   return <Grid item xs={12} className={classes.gridContainer}>
      {activeStep === nSteps
      ?  <div className={classes.endBtnContainer}>
         {resetButton
            ?  React.cloneElement(resetButton, { onClick: handleReset })
            :  <Button startIcon={<DoneAllRoundedIcon />} color='primary' variant='outlined' size='small' onClick={handleReset}>
                  Fine
               </Button>}
         </div>
      : <MobileStepper
         variant="dots"
         steps={nSteps}
         position="static"
         activeStep={activeStep}
         classes={{ root: classes.mobileRoot, dots: classes.mobileDots }}
         backButton={
            isSmallScreen
            ?  <IconButton disabled={activeStep === 0 || disablePrev} onClick={handleBack}>
                  <ArrowBackIosRoundedIcon />
               </IconButton>
            :  <Button color='primary' variant='outlined' disabled={activeStep === 0 || disablePrev} onClick={handleBack}>
                  <ArrowBackIosRoundedIcon style={{ marginRight: '.5em', fontSize: '.85em' }} />
                  Indietro
               </Button>
         }
         nextButton={
            isSmallScreen
               ?  <IconButton disabled={disableNext} onClick={handleNext}>
                     <ArrowForwardIosRoundedIcon />
                  </IconButton>
               :   <Button disabled={disableNext} color='primary' variant='outlined' onClick={handleNext}>
                     Avanti
                     <ArrowForwardIosRoundedIcon style={{ marginLeft: '.5em', fontSize: '.85em' }} />
                  </Button>
         }
      />}
   </Grid>
}

export default React.memo(Controls)
