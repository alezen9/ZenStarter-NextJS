import React from 'react'
import { makeStyles } from '@material-ui/core'
import { ZenPalette } from '@_palette'

const useStyles = makeStyles({
  ldsEllipsis: {
    display: 'inline-block',
    position: 'relative',
    width: 80,
    height: '100%',
    '& div': {
      position: 'absolute',
      top: 'calc(50% - 5px)',
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: ZenPalette.typographyGrey,
      animationTimingFunction: 'cubic-bezier(0, 1, 1, 0)'
    },
    '& div:nth-child(1)': {
      left: 8,
      animation: '$lds-ellipsis1 0.6s infinite'
    },
    '& div:nth-child(2)': {
      left: 8,
      animation: '$lds-ellipsis2 0.6s infinite'
    },
    '& div:nth-child(3)': {
      left: 32,
      animation: '$lds-ellipsis2 0.6s infinite'
    },
    '& div:nth-child(4)': {
      left: 56,
      animation: '$lds-ellipsis3 0.6s infinite'
    }
  },
  '@keyframes lds-ellipsis1': {
    from: {
      transform: 'scale(0)'
    },
    to: {
      transform: 'scale(1)'
    }
  },
  '@keyframes lds-ellipsis3': {
    from: {
      transform: 'scale(1)'
    },
    to: {
      transform: 'scale(0)'
    }
  },
  '@keyframes lds-ellipsis2': {
    from: {
      transform: 'translate(0, 0)'
    },
    to: {
      transform: 'translate(24px, 0)'
    }
  }

})

const Spinner = () => {
  const { ldsEllipsis } = useStyles()
  return (
    <div className={ldsEllipsis}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}

export default React.memo(Spinner)
