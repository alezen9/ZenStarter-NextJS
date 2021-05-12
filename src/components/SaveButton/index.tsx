import React from 'react'
import { Button, makeStyles } from '@material-ui/core'
import { RotatingHourGlass } from '@_icons'

const useStyles = makeStyles(theme => ({
   button: {
      minWidth: 120
   }
}))

type Props = {
   onSubmit: VoidFunction
   disabled?: boolean
   isSubmitting?: boolean
   text: string
}

const SaveButton: React.FC<Props> = props => {
   const { onSubmit, isSubmitting = false, disabled = false, text = '' } = props
   const classes = useStyles()

   return (
      <Button
         disabled={disabled}
         onClick={onSubmit}
         variant='contained'
         color='primary'
         {...isSubmitting && {
            startIcon: <RotatingHourGlass />,
            disabled: true
         }}
         className={classes.button}>
         {isSubmitting ? 'In corso . . .' : text}
      </Button>
   )
}

export default React.memo(SaveButton)
