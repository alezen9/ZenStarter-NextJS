import React, { ReactNode } from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import { ZenPalette } from '@_MUITheme'

const useStyles = makeStyles(theme => ({
  info: {
    borderLeft: ZenPalette.borderWithOpacity,
    paddingLeft: '.5em',
    margin: '.5em 1em',
    [theme.breakpoints.down('xs')]: {
      margin: '.5em 0',
    },
    '& > p': {
      fontWeight: 'bold'
    },
    '& > div > span': {
      textAlign: 'justify',
      whiteSpace: 'pre-line'
    }
  }
}))

type GuideSectionProps = {
  title: ReactNode
  description: ReactNode
}

const GuideSection = React.memo((props: GuideSectionProps) => {
  const { title, description } = props
  const classes = useStyles()
  return (
    <Grid item xs={12} className={classes.info}>
      <Typography variant='body2'>{title}</Typography>
      <div>
        <Typography variant='caption'>{description}</Typography>
      </div>
    </Grid>
  )
})

export type GuideSectionType = {
  title: string
  description: string
}

type Props = {
  sections: GuideSectionType[]
}

const Content = (props: Props) => {
  const { sections } = props
  return (
    <Grid container spacing={3}>
      {sections.map((el, i) => <GuideSection key={`section-guide-${i}`} {...el} />)}
    </Grid>
  )
}

export default React.memo(Content)
