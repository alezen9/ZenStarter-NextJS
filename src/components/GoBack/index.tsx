import React, { useCallback } from 'react'
import { Grid, Button, Typography } from '@material-ui/core'
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded'
import { useRouter } from 'next/router'
import { ZenPalette } from '@_palette'

type Props = {
  label?: any
  route: string
  as?: string
  margin?: boolean
}

const GoBack = (props: Props) => {
  const { label, route, as, margin = true } = props
  const router = useRouter()

  const goBack = useCallback(
    () => {
      if (as) router.push(route, as)
      else router.push(route)
    }, [route, as])

  return (
      <Grid item {...margin && { style: { marginBottom: '2em' } }}>
         <Button
            style={{ color: ZenPalette.typographyGrey }}
            variant='text'
            startIcon={<NavigateBeforeRoundedIcon />}
            onClick={goBack}>
         <Typography variant='caption'>
            {label || 'Back'}
         </Typography>
         </Button>
      </Grid>
  )
}

export default React.memo(GoBack)
