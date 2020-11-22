import React, { ReactElement, useMemo } from 'react'
import { makeStyles, TableCell, useMediaQuery, useTheme } from '@material-ui/core'
import { ZenPalette } from '@_palette'

type Props = {
  name?: string
  align?: 'left'|'center'|'right'
  style?: any
  headerStyles?: any
  component?: ReactElement
  sticky?: boolean
  isHeader?: boolean
  colSpan?: number
  isLastStickyColumn?: boolean
  [x: string]: any
}

const useStyles = makeStyles(theme => ({
  stickyCell: (props: any) =>  props.sticky
    ? ({
      [theme.breakpoints.up('sm')]: {
        position: 'sticky',
        left: 0,
        zIndex: 1,
        ...props.isHeader ? {
          backdropFilter: 'blur(25px)'
        } : {
          background: ZenPalette.tableCellBackground
        }
        // background: props.isHeader
        //   ? ZenPalette.tableHeaderCellBackground
        //   : ZenPalette.tableCellBackground
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
  })
}))


const ZenTableCell = (props: Props) => {
  const { name = '', align = 'left', style = {}, headerStyles = {}, component, sticky = false, isHeader = false, colSpan, isLastStickyColumn = true } = props
  const classes = useStyles({ sticky, isHeader, isLastStickyColumn })
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))
  const inlineStyles = useMemo(() => {
    // @ts-ignore
    const { width, minWidth, ...rest } = { ...headerStyles, ...style }
    return isSmallScreen
      ? rest
      : { ...headerStyles, ...style }
  }, [isSmallScreen, JSON.stringify({ ...headerStyles, ...style })])

  return (
    <>
    <TableCell
      {...colSpan && { colSpan }}
      className={classes.stickyCell}
      align={align}
      style={inlineStyles}>
      {component || name}
    </TableCell>
    {/* {sticky && !isSmallScreen && <TableCell {...isHeader && { className: classes.bgCellHeader }} style={{ ...headerStyles, ...style }}></TableCell>} */}
    </>
  )
}

export default React.memo(ZenTableCell)
