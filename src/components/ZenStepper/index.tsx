import React, { ReactElement, ReactNode, useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { get, uniqueId } from 'lodash';
import Controls from './Controls';
import { Grid, Step, Stepper, StepLabel, Typography, useMediaQuery, useTheme, StepIconProps } from '@material-ui/core'
import { StepperFlowConfig } from './helper';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded'
import { ZenPalette } from '@_MUITheme';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  stepper: {
    padding: '8px 0 24px 0'
  }
})
)

type Props = {
  children: ReactElement<ZenStepProps>[]
  safeGuard?: (prevStep: number, nextStep: number) => boolean
  OnCompleteStep: ReactNode
  disableNext?: boolean
  disablePrev?: boolean
  flowConfig?: StepperFlowConfig
  FinalActions?: ReactElement
}

const ZenStepper: React.FC<Props> = props => {
  const { children = [], safeGuard, OnCompleteStep, disableNext, disablePrev, FinalActions } = props
  const { updateStatus, setActiveStepRef } = (props.flowConfig || {}) as StepperFlowConfig
  const classes = useStyles()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    setActiveStepRef.current = setActiveStep
  }, [])

  const handleNext = useCallback(() => {
    setActiveStep(state => {
      const shouldUpdate = safeGuard
        ? safeGuard(state, state + 1)
        : true
      const nextStep = shouldUpdate
        ? state + 1
        : state
      if (updateStatus) updateStatus(state, nextStep)
      return nextStep
    })
  }, [safeGuard])

  const handleBack = useCallback(() => {
    setActiveStep(state => {
      if (state === 0) return 0
      const shouldUpdate = safeGuard
        ? safeGuard(state, state - 1)
        : true
      const nextStep = shouldUpdate
        ? state - 1
        : state
      if (updateStatus) updateStatus(state, nextStep)
      return nextStep
    })
  }, [safeGuard])

  const handleReset = useCallback(() => {
    setActiveStep(0)
  }, [])


  return (
    <div className={classes.root}>
      <Stepper className={classes.stepper} activeStep={activeStep} alternativeLabel>
        {children.map((child: ReactElement<ZenStepProps>, i: number) => (
          <Step disabled={get(child, 'props.disabled', false)} key={uniqueId('zenStep-')}>
            <StepLabel
              {...get(child, 'props.icon', null) && {
                StepIconComponent: CustomIconStepper(get(child, 'props.icon', null))
              }}>
              {!(get(child, 'props.icon', null) && isSmallScreen) && <Typography variant='caption'>
                {get(child, 'props.title', 'Step sconosciuto')}
              </Typography>}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid style={{ position: 'relative', paddingBottom: 90 }} justify='center' container spacing={3}>
        {activeStep === children.length
          ? OnCompleteStep || <>Fine</>
          : get(children, `${activeStep}.props.component`, <>Unknown component</>)}
        <Controls {...{ nSteps: children.length, handleBack, handleNext, handleReset, activeStep, disableNext, disablePrev, FinalActions }} />
      </Grid>
    </div>
  )
}

export default React.memo(ZenStepper)

type ZenStepProps = {
  title: string
  icon?: ReactElement
  disabled?: boolean
  component: ReactNode
}

export const ZenStep = (props: ZenStepProps) => <div {...props} />

const useCustomIconStyles = makeStyles(theme => ({
  typographyColor: {
    color: ZenPalette.typographyGrey
  }
}))

const CustomIconStepper = (icon: ReactElement) => (props: StepIconProps) => {
  const { active, completed } = props
  const classes = useCustomIconStyles()

  return completed
    ? <CheckCircleRoundedIcon color='primary' />
    : React.cloneElement(icon, {
      ...active && { color: 'primary' },
      ...!active && { className: classes.typographyColor }
    })
}