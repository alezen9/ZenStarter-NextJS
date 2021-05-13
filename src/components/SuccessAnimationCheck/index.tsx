import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { motion } from 'framer-motion'
import { SuccessAnimated } from '@_components/AnimatedSuccess'

type Props = {
  message: string
}

const SuccessAnimationCheck: React.FC<Props> = props => {
  const { message } = props
  return (
    <motion.div
      style={{ width: '100%' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <Grid container item xs={12} justify='center' style={{ margin: '4em auto' }}>
        <Grid item style={{ margin: '1em auto' }}>
          <SuccessAnimated style={{ width: '7em', height: '7em' }} />
        </Grid>
        <Grid item xs={12} style={{ marginBottom: '5em' }}>
          <Typography align='center'>{message}</Typography>
        </Grid>
      </Grid>
    </motion.div>
  )
}

export default React.memo(SuccessAnimationCheck)
