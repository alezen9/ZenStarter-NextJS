import React, { useLayoutEffect, ReactNode, ReactElement } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import { IconButton, Typography, Grid, makeStyles, useTheme, useMediaQuery } from '@material-ui/core'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import { TransitionProps } from '@material-ui/core/transitions/transition'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  content: {
    height: (props: any) => props.fullHeight ? '85vh' : 'auto',
    overflowY: 'auto'
  }
}))

type Props = {
  open: boolean
  onClose: any
  withTransition?: boolean
  title?: ReactNode
  content: ReactNode
  actions?: ReactNode
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  fullHeight?: boolean
  overflowY?: 'hidden' | 'scroll' | 'auto'
  fullScreen?: boolean
}

const ZenDialog = (props: Props) => {
  const {
    open,
    onClose,
    withTransition,
    title,
    content,
    actions,
    maxWidth = 'sm',
    fullHeight = false,
    overflowY = 'auto',
    fullScreen
  } = props
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))
  const classes = useStyles({ fullHeight })

  useLayoutEffect(() => {
    if (open && fullScreen && isSmallScreen) document.body.style.position = 'fixed'
    return () => {
      if (fullScreen && isSmallScreen) document.body.style.position = 'relative'
    }
  }, [open, fullScreen, isSmallScreen])

  return (
    <Dialog
      open={open}
      {...{ ...withTransition && { TransitionComponent: Transition } }}
      keepMounted={false}
      onClose={onClose}
      fullWidth
      fullScreen={fullScreen !== undefined ? fullScreen : isSmallScreen}
      maxWidth={maxWidth}
      aria-labelledby='details'
      aria-describedby='details'
    >
      {title && <DialogTitle id='alert-dialog-slide-title' >
        <Grid container spacing={3} justify='space-between'>
          <Grid item xs={10}>
            <Typography align='left' variant='h4'>{title}</Typography>
          </Grid>
          <Grid item style={{ padding: 0, textAlign: 'right' }} xs={2}>
            <IconButton
              color='primary'
              onClick={onClose}
              aria-label='Close'>
              <CloseRoundedIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>}
      <DialogContent className={classes.content} style={{ overflowY }}>
        {content}
      </DialogContent>
      {actions && <DialogActions style={{ padding: '8px 24px', ...fullScreen && { padding: 24 } }}>{actions}</DialogActions>}
    </Dialog>
  )
}

export default React.memo(ZenDialog)
