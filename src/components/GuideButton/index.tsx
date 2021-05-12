import React, { useCallback, useState } from 'react'
import OfflineBoltRoundedIcon from '@material-ui/icons/OfflineBoltRounded'
import { IconButton, makeStyles, Tooltip, Typography } from '@material-ui/core'
import ZenDialog from '@_components/ZenDialog'
import Content, { GuideSectionType } from './Content'
import { ZenPalette } from '@_MUITheme'

const useStyles = makeStyles(theme => ({
  '@keyframes shine': {
    '0%': {
      backgroundPosition: 'right'
    }
  },
  shine: {
    position: 'relative',
    color: 'rgba(218, 165, 32, 1)',
    '&:after': {
      position: 'absolute',
      content: '""',
      top: '50%',
      left: '50%',
      height: '100%',
      width: '100%',
      transform: 'translate(-50%, -50%)',
      clipPath: 'circle(11px)',
      backgroundImage: ZenPalette.shineBackgroundImage,
      backgroundSize: '300% 100%',
      animation: '$shine 2s infinite'
    }
  },
  title: {
    display: 'flex',
    alignItems: 'center'
  },
  titleIcon: {
    marginRight: '.5em'
  }
}))

type TitleProps = {
  title: string
}

const Title = React.memo((props: TitleProps) => {
  const { title } = props
  const classes = useStyles()
  return (
    <Typography color='primary' className={classes.title}>
      <OfflineBoltRoundedIcon className={classes.titleIcon} />
      <span>{title}</span>
    </Typography>
  )
})

type Props = {
  title: string
  sections: GuideSectionType[]
  className?: string
}

const GuideButton = (props: Props) => {
  const { title, sections, className = '' } = props
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const toggleDialog = useCallback(() => {
    setOpen(state => !state)
  }, [])

  return (
    <>
      <Tooltip title='Come funziona'>
        <IconButton onClick={toggleDialog} className={`${classes.shine} ${className}`} >
          <OfflineBoltRoundedIcon />
        </IconButton>
      </Tooltip>
      <ZenDialog
        open={open}
        maxWidth='md'
        title={<Title title={title} />}
        content={<Content sections={sections} />}
        onClose={toggleDialog}
      />
    </>
  )
}

export default React.memo(GuideButton)
