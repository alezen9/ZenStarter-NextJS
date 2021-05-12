import React, { useCallback } from 'react'
import { makeStyles, IconButton } from '@material-ui/core'
import ItemList from './ItemList'
import MenuRoundedIcon from '@material-ui/icons/MenuRounded'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import ThemeSwitch from '@_components/ThemeModeSwitch'
import { useConfigStore } from '@_zustand/config'
import { logoutFn, RouteItem } from '..'
import { ConfigStore } from '@_zustand/config/helpers'
import { ZenPalette } from '@_MUITheme'

const useStyles = makeStyles(theme => ({
   relativeWrapper: {
      position: 'relative',
      width: '100%',
      maxWidth: (props: any) => props.menuOpen ? 250 : 60,
      overflow: 'hidden'
   },
   fixed: {
      position: 'fixed',
      display: 'flex',
      zIndex: 10,
      backgroundColor: ZenPalette.backgroundColorStandOut,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      maxWidth: (props: any) => props.menuOpen ? 250 : 60,
      overflow: 'hidden',
      transition: 'max-width .1s ease, background-color .1s ease',
      height: '100vh',
      padding: '0 1em',
      boxSizing: 'border-box',
      // '&:before': {
      //    position: 'absolute',
      //    content: '""',
      //    top: '50%',
      //    transform: 'translateY(-50%)',
      //    height: '85vh',
      //    width: '100%',
      //    borderRight: theme.type === 'light'
      //       ? '1px solid rgba(0,0,0,.1)'
      //       : '1px solid rgba(255,255,255,.1)'
      // }
   },
   toggleMenu: {
      position: 'absolute',
      top: '.5em',
      left: 6
   },
   themeToggleClass: {
      position: 'absolute',
      top: '1em',
      right: '1em',
      transform: (props: any) => props.menuOpen
         ? 'translate(0)'
         : 'translate(.7em, 3em)',
      transition: 'transform .1s ease-out',
      '@media(max-height: 450px)': {
         visibility: (props: any) => props.menuOpen ? 'visible' : 'hidden',
         pointerEvents: (props: any) => props.menuOpen ? 'all' : 'none'
      }
   }
}))

const stateSelector = (state: ConfigStore) => ({
   menuOpen: state.menuOpen,
   toggleMenu: state.toggleMenu
})

type Props = {
   items: RouteItem[]
   logout: logoutFn
}

const DesktopMenu = (props: Props) => {
   const { items, logout } = props
   const { menuOpen, toggleMenu } = useConfigStore(stateSelector)
   const classes = useStyles({ menuOpen })

   const _logout = useCallback((e: any) => {
      logout(menuOpen, toggleMenu)(e)
   }, [logout, menuOpen, toggleMenu])

   return (
      <div className={classes.relativeWrapper}>
         <div className={classes.fixed}>
            <IconButton
               className={classes.toggleMenu}
               onClick={toggleMenu}>
               {menuOpen
                  ? <CloseRoundedIcon />
                  : <MenuRoundedIcon />}
            </IconButton>
            <div className={classes.themeToggleClass}>
               <ThemeSwitch />
            </div>
            <ItemList items={items} logout={_logout} />
         </div>
      </div>
   )
}

export default React.memo(DesktopMenu)
