import React, { useState, useMemo, useEffect, ReactNode } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import ZenTableCell from './Cell'
import { uniqueId } from 'lodash'
import { setData, MobileRowCell, TableHeaderData, TableRowData, SetDataOut, getLastStickyIndex } from './helpers'
import ZenLoadingMask from '../ContentLoader/LoadingMask'
import { Typography, useTheme, useMediaQuery } from '@material-ui/core'
import { ZenPalette } from '@_palette'
import { zenToolboxInstance } from '@_utils/Toolbox'

const useStyles = makeStyles(theme => ({
  table: {
    transition: 'background-color .1s ease'
  },
  tableContainer: {
    [theme.breakpoints.down('xs')]: {
      width: '100vw',
      margin: '0 -1em',
      overflowX: 'hidden'
    }
  },
  userRow: {
    backgroundColor: ZenPalette.userTableRowBackgroundColor
  }
}))

type TableProps = {
  headers: TableHeaderData[],
  data: TableRowData[],
  withActions?: boolean,
  pagination?: ReactNode,
  forceMobile?: boolean
}

const CustomTable = React.memo((props: TableProps) => {
  const { headers = [], data = [], withActions = false, pagination, forceMobile = false } = props
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))
  const classes = useStyles()
  const [tableId] = useState(uniqueId('table-'))
  const [lastStickyIndex, setLastStickyIndex] = useState(0)

  const { _headers = [], _data = [], _isUserIndexRow } = useMemo(():SetDataOut => {
    if (!headers.length) {
      return {
        _headers: [],
        _data: [],
        _isUserIndexRow: undefined
      }
    }
    const res = setData({ headers, data, withActions })
    const _lastStickyIndex = getLastStickyIndex(res._headers)
    setLastStickyIndex(_lastStickyIndex)
    return res
  }, [headers, data, withActions])

  const mainHeaders = useMemo(() => {
    if (!_headers.length) return null
    const main = _headers.find(({ main }) => main)
    return [
      main || _headers[0],
      ...[...withActions ? [{ name: ' ' }] : []]
    ]
  }, [_headers, withActions])

  return (
        <>
          <TableContainer className={classes.tableContainer} component={Paper} elevation={0}>
            <Table className={classes.table} aria-label='table'>
              <TableHead>
                <TableRow>
                  {forceMobile || isSmallScreen
                    ? mainHeaders
                      ? mainHeaders.map((cell, i) => (
                        <ZenTableCell
                          key={`${tableId}-headerCell-${i}`}
                          align={i !== 0 ? 'right' : 'left'}
                          {...cell} />
                      ))
                      : <></>
                    : _headers.map((cell, i) => (
                      <ZenTableCell
                        isHeader
                        isLastStickyColumn={lastStickyIndex === i}
                        key={`${tableId}-headerCell-${i}`}
                        align={i !== 0 ? 'right' : 'left'}
                        {...cell} />
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {_data.length
                  ? _data.map((row, i) => {
                    return (forceMobile || isSmallScreen) && headers.length > 1
                      ? <MobileRowCell
                        key={`${tableId}-bodyCell-${i}`}
                        row={row}
                        _headers={_headers}
                        mainHeaders={mainHeaders}
                        withActions={withActions}
                        {..._isUserIndexRow === i && { className: classes.userRow }}
                      />
                      : <TableRow key={`${tableId}row-${i}`} {..._isUserIndexRow === i && { className: classes.userRow }}>
                        {Object.entries(row).map(([key, value], j) => {
                          const found = key === 'actions'
                            ? undefined
                            : headers.find(({ name, id }) => zenToolboxInstance.camelize(id || name) === zenToolboxInstance.camelize(key))
                          return <ZenTableCell
                            {...found && found.style && { 
                              headerStyles: found.style,
                              sticky: !!found.sticky, 
                              isLastStickyColumn: lastStickyIndex === j
                            }}
                            key={`${tableId}-bodyCell-${i}-${j}`}
                            align={j !== 0 ? 'right' : 'left'}
                            {...key === 'actions'
                              ? { name: value }
                              : { component: value }}
                          />
                        })}
                      </TableRow>
                  })
                  : <TableRow>
                    <ZenTableCell colSpan={_headers.length} component={<Typography>Nessun dato</Typography>} />
                  </TableRow>}
              </TableBody>
            </Table>
          </TableContainer>
          {pagination || <></>}
    </>
  )
})

type WrapperProps = TableProps & {
  withMask?: boolean,
  isFetching?: boolean
}

const ZenTable = (props: WrapperProps) => {
  const { withMask = false, isFetching = false } = props
  const [isFirstRun, setIsFirstRun] = useState(true)

  useEffect(() => {
    let mounted = true
    if (isFirstRun && !isFetching && mounted) setIsFirstRun(false)
    return () => {
      mounted = false
    }
  }, [isFirstRun, isFetching])

  return withMask
    ? <>
      <ZenLoadingMask isLoading={isFetching}>
        <CustomTable {...props} />
      </ZenLoadingMask>
      </>
    : <CustomTable {...props} />
}

export default React.memo(ZenTable)
