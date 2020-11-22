import React, { useState } from 'react'
import { makeStyles, IconButton, Typography, Popover } from '@material-ui/core'
import { ZenPalette } from '@_palette'
import DetailsRoundedIcon from '@material-ui/icons/DetailsRounded'
import { uniqueId } from 'lodash'

const useStyles = makeStyles(theme => ({
  popoverClass: {
    padding: 8,
    minWidth: 130,
    color: ZenPalette.typographyGrey
  },
  showCondominiButton: {
    position: 'relative',
    '&:hover': {
      '& svg': {
        opacity: 1
      },
      '& h6': {
        opacity: 0
      }
    },
    '& h6': {
      opacity: 1,
      transition: 'opacity .2s ease'
    },
    '& svg': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      opacity: 0,
      transition: 'opacity .2s ease'
    }
  },
  ulClass: {
    position: 'relative',
    all: 'unset',
    listStyleType: 'none',
    '& li': {
      fontSize: '.9em',
      lineHeight: '2.2em'
    },
    '& li:not(:first-of-type)': {
      position: 'relative',
      '&:after': {
        position: 'absolute',
        content: '" "',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '115%',
        borderTop: theme.type === 'dark'
          ? '1px solid rgba(255,255,255,.2)'
          : '1px solid rgba(17,17,17,.2)'
      }
    }
  }
}))

type Props = {
  data: string[]
  stringData: string
  typoGraphyLabelPropsForward?: any
}

const ListField = (props: Props) => {
  const { data = [] } = props
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)

  return data.length === 0
    ? <IconButton
      style={{ width: 48, height: 48 }}>
      <Typography variant='h6'>
        {data.length}
      </Typography>
    </IconButton>
    : <div>
      <IconButton
        className={classes.showCondominiButton}
        style={{ width: 48, height: 48 }}
        onClick={e => setAnchorEl(e.currentTarget)}>
        <Typography variant='h6'>
          {data.length}
        </Typography>
        <DetailsRoundedIcon />
      </IconButton>
      <Popover
        classes={{
          paper: classes.popoverClass
        }}
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <div>
          <ul className={classes.ulClass}>
            {data.map(name => <li key={uniqueId()}>{name}</li>)}
          </ul>
        </div>
      </Popover>
    </div>
}

export default React.memo(ListField)
