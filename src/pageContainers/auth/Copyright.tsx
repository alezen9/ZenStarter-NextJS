import { Grid, Typography } from '@material-ui/core'
import React from 'react'

const Copyright = () => {
  return (
    <Grid container item xs={12} justify='center'>
      <Typography variant='caption' align='center'>
        {`Copyright © Zen Next.js starter ${new Date().getFullYear()}`}
      </Typography>
    </Grid>
  )
}

export default Copyright
