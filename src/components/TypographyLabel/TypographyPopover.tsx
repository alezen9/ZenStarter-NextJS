import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { uniqueId } from 'lodash'

const useStyles = makeStyles(theme => ({
  popover: {
    pointerEvents: 'none'
  },
  paper: {
    padding: theme.spacing(1)
  }
}))

const ellipsisStyleProps = {
  style: {
    width: 200,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    cursor: 'pointer'
  }
}

const TypographyPopover = props => {
  const { text = '', popoverText = '', typographyProps = {}, autoEllipsis = true } = props
  const { popover, paper } = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [id] = useState(uniqueId('popover-'))

  const handlePopoverOpen = e => setAnchorEl(e.currentTarget)

  const handlePopoverClose = () => setAnchorEl(null)

  const open = Boolean(anchorEl)

  return (
    <>
      <Typography
        aria-owns={open ? id : undefined}
        aria-haspopup='true'
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        {...typographyProps}
        {...autoEllipsis && { ellipsisStyleProps }}
      >
        {text}
      </Typography>
      <Popover
        id={id}
        className={popover}
        elevation={12}
        classes={{
          paper: paper
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography variant='caption'>{popoverText}</Typography>
      </Popover>
    </>
  )
}

TypographyPopover.propTypes = {
  text: PropTypes.string.isRequired,
  popoverText: PropTypes.string.isRequired,
  typographyProps: PropTypes.any
}

export default React.memo(TypographyPopover)
