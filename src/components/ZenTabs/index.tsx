import React, { useState, ReactNode, ReactElement } from 'react'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Tabs, Tab, useMediaQuery, Box } from '@material-ui/core'
// utils
import { compact, get } from 'lodash'

type Props = {
  children?: ReactElement<TabProps>[]
  safeGuard?: (newTabIndex: number) => boolean
}

const useStyles = makeStyles(theme => ({
  wrapper: {
    flexGrow: 1,
    backgroundColor: 'transparent'
  },
  appBar: {
    boxShadow: 'unset',
    backgroundColor: theme.type === 'light'
      ? 'rgba(0,0,0,.05)'
      : 'rgba(255,255,255,.1)',
    padding: '.2em'
  },
  tabs: {
    background: 'transparent'
  },
  tab: {
    color: theme.type === 'light'
      ? '#333'
      : '#fafafa',
    fontWeight: 18,
    textTransform: 'none'
  },
  tabSelected: {
    zIndex: 1,
    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
  },
  indicatorClass: {
    height: '100%',
    borderRadius: 7,
    backgroundColor: theme.type === 'light'
      ? 'rgba(255, 255, 255, 0.9)'
      : 'rgba(255, 255, 255, 0.3)',
    boxShadow: theme.type === 'light'
      ? '0 3px 10px rgba(0,0,0,.1)'
      : 'unset',
    bottom: 0
  },
  box: {
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing(4),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    borderRadius: 4
  },
  outercomponentBox: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(4)
  }
}))

const tabProps: any = (index: number) => {
  const { tab, tabSelected } = useStyles()
  return {
    id: `tabPanel-${index}`,
    'aria-controls': `tabPanel-${index}`,
    classes: {
      root: tab,
      selected: tabSelected
    }
  }
}

const ZenTabs: React.FC<Props> = props => {
  const { children, safeGuard } = props
  const { wrapper, appBar, tabs, indicatorClass, box, outercomponentBox } = useStyles()
  const [value, setValue] = useState(0)
  const isSmallScreen = useMediaQuery('(max-width: 850px)')

  const handleChange = (e, newValue) => {
    const shouldChange = safeGuard
      ? safeGuard(newValue)
      : true
    if (shouldChange) setValue(newValue)
  }

  return (
    <div className={wrapper}>
      <AppBar className={appBar} position='static'>
        <Tabs
          variant={isSmallScreen ? 'fullWidth' : 'fullWidth'}
          value={value}
          onChange={handleChange}
          aria-label='Tab Panel'
          indicatorColor='primary'
          classes={{ root: tabs, indicator: indicatorClass }}
        >
          {React.Children.map(compact(children), (child, i) => {
            return <Tab
              disableRipple
              disabled={get(child, 'props.disabled', false)}
              key={`tab-${i}`}
              {...isSmallScreen && get(child, 'props.icon' , null) && { icon: get(child, 'props.icon' , <></>) }}
              {...((!isSmallScreen && get(child, 'props.title' , null)) || !get(child, 'props.icon', null)) && { label: get(child, 'props.title' , '-') }}
              {...tabProps(i)}
            />
          }
          )}
        </Tabs>
      </AppBar>
      {children.map((child, i) => {
        return (
          <div
            key={`tabPanel-${i}`}
            role='tabPanel'
            hidden={value !== i}
            id={`tabPanel-${i}`}
            aria-labelledby={`tabPanel-${i}`}
          >
            <Box p={3} className={box}>
              {child.props.component}
            </Box>
            {child.props.outercomponent && <Box p={3} className={outercomponentBox}>
              {child.props.outercomponent}
            </Box>}
          </div>
        )
      })}
    </div>
  )
}

export default React.memo(ZenTabs)

type TabProps = {
  title: string
  icon?: ReactNode
  disabled?: boolean
  component: ReactNode
  outercomponent?: ReactNode
}

export const ZenTab = (props: TabProps) => <div {...props} />
