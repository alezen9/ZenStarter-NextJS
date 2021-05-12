import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
   root: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'baseline',
      [theme.breakpoints.down('xs')]: {
         flexDirection: 'column',
         alignItems: 'flex-end'
      },
      '& > *': {
         marginTop: theme.spacing(2)
      }
   },
   total: {
      marginRight: 'auto',
      width: 'auto',
      [theme.breakpoints.down('xs')]: {
         marginRight: 'unset'
      }
   }
}))

type Props = {
   limit?: number,
   totalCount: number
   currentPage: number
   onChangePage: (e: any, newPage: number) => void
}

const ZenPagination = (props: Props) => {
   const { limit = 10, totalCount = 10, currentPage = 1, onChangePage } = props
   const classes = useStyles()

   const count = useMemo(() => Math.ceil(totalCount / limit), [totalCount])

   return (
      <div className={classes.root}>
         {!!totalCount && <Typography variant='caption' className={classes.total}>{totalCount} record{`${totalCount === 1 ? '' : 's'}`}</Typography>}
         <Pagination
            count={count}
            siblingCount={1}
            page={currentPage}
            boundaryCount={1}
            onChange={onChangePage}
            shape='rounded'
            variant='outlined'
            color='primary' />
      </div>
   )
}

export default React.memo(ZenPagination)
