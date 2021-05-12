import React from 'react'
import ZenDialog from '@_components/ZenDialog'
import { Button, Typography } from '@material-ui/core'
import { ZenPalette } from '@_MUITheme'

type Props = {
   open: boolean
   title?: string
   text: any
   onDelete: VoidFunction
   onClose: VoidFunction
}

const WarningDeleteDialog = (props: Props) => {
   const { open = false, title = 'Attenzione!', text = '', onDelete, onClose } = props
   return (
      <ZenDialog
         open={open}
         title={title}
         fullScreen={false}
         content={<Typography >{text}</Typography>}
         actions={
            <Button
               style={{ minWidth: 150, backgroundColor: ZenPalette.error }}
               onClick={onDelete}
               variant='contained'>
               Elimina
         </Button>
         }
         onClose={onClose}
      />
   )
}

export default React.memo(WarningDeleteDialog)
