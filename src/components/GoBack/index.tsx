import React, { useCallback } from 'react'
import { Grid, Button, Typography } from '@material-ui/core'
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded'
import { useRouter } from 'next/router'
import { ZenPalette } from '@_MUITheme'

type Props = {
  label?: any
  //   route?: string
  //   as?: string
  withMarginBottom?: boolean
}

const GoBack: React.FC<Props> = props => {
  const { label, withMarginBottom = true } = props
  const router = useRouter()

  const goBack = useCallback(
    () => {
      router.back()
      // if (as) router.push(route, as)
      // else router.push(route)
    }, [])

  return (
    <Grid item {...withMarginBottom && { style: { marginBottom: '2em' } }}>
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
