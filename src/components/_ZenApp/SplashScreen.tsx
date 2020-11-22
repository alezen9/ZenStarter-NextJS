import React, { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(({
   motionDiv: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      height: '100vh'
   }
}))

type Props = {
   icon: ReactNode
}

const SplashScreen = (props: Props) => {
   const { icon } = props
   const classes = useStyles()
   return (
   <AnimatePresence>
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         className={classes.motionDiv}
      >
         {icon}
      </motion.div>
   </AnimatePresence>
   )
}

export default React.memo(SplashScreen)
