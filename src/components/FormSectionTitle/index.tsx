import { Divider, Grid, GridProps, Typography } from '@material-ui/core'
import React from 'react'

type Props = Partial<GridProps> & {
   title: string
   withDivider?: boolean
   titleGridProps?: Partial<GridProps>
   children?: any
}

const FormSectionTitle: React.FC<Props> = props => {
   const { title = 'N/A', withDivider, titleGridProps = {}, children = [], ...gridProps } = props
   return (
      <>
         <Grid item container alignItems='center' {...gridProps || {}}>
            <Grid item xs={9} {...titleGridProps}>
               <Typography variant='h5'>{title}</Typography>
            </Grid>
            {children || <></>}
            {withDivider && <Divider flexItem style={{ height: 1, width: '100%', margin: '.5em 0' }} />}
         </Grid>
      </>
   )
}

export default React.memo(FormSectionTitle)
