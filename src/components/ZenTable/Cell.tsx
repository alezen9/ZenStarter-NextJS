import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react'
import { IconButton, makeStyles, TableCell, useMediaQuery, useTheme } from '@material-ui/core'
import { ZenPalette } from '@_MUITheme'
import { get } from 'lodash'
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded'

type CellSort = {
   show: boolean
   disabled: boolean
   isActive: boolean
   initialIsASC: boolean
   handleSortToggle: (isASC: boolean) => void
}

type Props = {
   name?: string
   align?: 'left' | 'center' | 'right'
   style?: any
   headerStyles?: any
   component?: ReactElement
   sticky?: boolean
   isHeader?: boolean
   colSpan?: number
   isLastStickyColumn?: boolean
   sort?: CellSort
   [x: string]: any
}

const useStyles = makeStyles(theme => ({
   stickyCell: (props: any) => props.sticky
      ? ({
         [theme.breakpoints.up('sm')]: {
            position: 'sticky',
            left: 0,
            zIndex: 1,
            ...props.isHeader ? {
               backdropFilter: 'blur(25px)'
            } : {
               // background: ZenPalette.tableCellBackground
               background: ZenPalette.tableBackgroundColor
            }
         },
         ...props.isLastStickyColumn && {
            '&:after': {
               [theme.breakpoints.up('sm')]: {
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: 1,
                  height: '100%',
                  content: '""',
                  borderRight: '1px solid',
                  opacity: .1
               }
            }
         }
      })
      : {},
   bgCellHeader: (props: any) => ({
      background: props.isHeader
         ? ZenPalette.tableHeaderCellBackground
         : ZenPalette.tableCellBackground
   }),
   sortButton: (props: any) => ({
      marginRight: '.5em',
      transform: props.isASC
         ? 'rotateZ(0)'
         : 'rotateZ(180deg)',
      transition: 'transform .2s ease-in-out',
      ...!props.sortActive && {
         color: ZenPalette.typographyGrey,
         opacity: .6
      }
   })
}))


const ZenTableCell = (props: Props) => {
   const { name = '', align = 'left', style = {}, headerStyles = {}, component, sticky = false, isHeader = false, colSpan, isLastStickyColumn = true, sort } = props
   const [isASC, setIsASC] = useState(get(sort, 'initialIsASC', true))
   const classes = useStyles({ sticky, isHeader, isLastStickyColumn, isASC, sortActive: get(sort, 'isActive', false) })
   const theme = useTheme()
   const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))

   const inlineStyles = useMemo(() => {
      // @ts-ignore
      const { width, minWidth, ...rest } = { ...headerStyles, ...style }
      return isSmallScreen
         ? rest
         : { ...headerStyles, ...style }
   }, [isSmallScreen, JSON.stringify({ ...headerStyles, ...style })])

   const onSortToggle = useCallback(() => {
      const { handleSortToggle = () => { } } = sort || {}
      setIsASC(state => {
         handleSortToggle(!state)
         return !state
      })
   }, [get(sort, 'handleSortToggle', null)])

   return (
      <>
         <TableCell
            {...colSpan && { colSpan }}
            className={classes.stickyCell}
            align={align}
            style={inlineStyles}>
            {isHeader && get(sort, 'show', false) && (
               <IconButton onClick={onSortToggle} size='small' disabled={get(sort, 'disabled', false)} className={classes.sortButton}>
                  <ExpandMoreRoundedIcon />
               </IconButton>
            )}
            {component || name}
         </TableCell>
      </>
   )
}

export default React.memo(ZenTableCell)
