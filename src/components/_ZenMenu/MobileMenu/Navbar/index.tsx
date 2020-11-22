import React, { useState, useLayoutEffect, useCallback, Fragment } from 'react'
import Link from 'next/link'
import { Typography, makeStyles, IconButton } from '@material-ui/core'
import Spinner from '@_components/Loaders/Spinner'
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded'
import { useRouter } from 'next/router'
import { asyncTimeout } from '@_utils/helpers'
import { apiInstance } from 'src/SDK'
import ThemeSwitch from '@_components/ThemeModeSwitch'
import { ZenPalette } from '@_palette'
import { useConfigStore } from '@_zustand/configStore'
import { RouteItem } from '@_components/_ZenMenu'

const useStyles = makeStyles(theme => ({
   themeSwitchColor: {
      backgroundColor: theme.type === 'dark'
         ? 'rgb(17, 17, 17) !important'
         : '#fafafa !important',
      color: `${ZenPalette.typographyGrey} !important`
   },
   themeSwitchColorInvert: {
      backgroundColor: theme.type === 'light'
         ? 'rgb(17, 17, 17) !important'
         : '#fafafa !important',
      color: `${ZenPalette.typographyGrey} !important`
   },
   menuItemBorderFix: {
      borderBottom: theme.type === 'dark'
         ? '1px solid rgba(255,255,255,.2)'
         : '1px solid rgba(0,0,0,.1)'
   },
   headerBoxShadowFix: {
      boxShadow: theme.type === 'dark'
         ? '18px 18px 30px rgba(255,255,255,.02), -18px -18px 30px rgba(255,255,255,.01)'
         : '18px 18px 30px rgba(0,0,0,.05), -18px -18px 30px rgba(0,0,0,.05)'
   },
   themeSwitchColorInvertNoBg: {
      color: `${ZenPalette.typographyGrey} !important`
   }
}))

const Links = React.memo((props: { toggleMenu: VoidFunction, items: RouteItem[] }) => {
   const { toggleMenu, items } = props
   const { menuItemBorderFix } = useStyles()
   return <>
   {items.map(({ title, path }, i) => {
      return <Fragment key={`main-path-${i}`}>
         <li className={`menu-item ${menuItemBorderFix}`}>
         <Link href={path} >
            <div style={{
               height: 35,
               fontSize: '1.4em',
               marginBottom: '.3em',
               display: 'flex',
               alignItems: 'flex-end' }} onClick={toggleMenu}> {title} </div>
         </Link>
         </li>
      </Fragment>
   })}
   </>
})

type Props = {
   isLoading?: boolean
   items: RouteItem[]
}

const Navbar = (props: Props) => {
   const { isLoading = false, items } = props
   const { themeSwitchColor, themeSwitchColorInvert, headerBoxShadowFix } = useStyles()
   const router = useRouter()
   const setIsLogged = useConfigStore(state => state.setIsLogged)
   const [open, setOpen] = useState(false)

   useLayoutEffect(() => {
      const setBodyPosition = async (): Promise<void> => {
         if (open) await asyncTimeout(600)
         document.body.style.overflow = open ? 'hidden' : 'auto'
      }
      setBodyPosition()
   }, [open])

   const toggleMenu = useCallback(() => {
      setOpen(state => !state)
   }, [])

   const afterLogout = useCallback(async () => {
      await router.push('/login')
      setIsLogged(false)
   },[router])

   const logout = useCallback(
      (e: any) => {
         e.preventDefault()
         if (open) toggleMenu()
         apiInstance.user_logout(afterLogout)
      }, [toggleMenu])

   return (
      <>
         <div className={open ? `header menu-opened ${themeSwitchColor}` : `header ${themeSwitchColor} ${headerBoxShadowFix}`}>
         <div className='burger-container' onClick={toggleMenu}>
            <div id='burger'>
               <div className={`bar topBar ${themeSwitchColorInvert}`} />
               <div className={`bar btmBar ${themeSwitchColorInvert}`} />
            </div>
         </div>
         <div className={`center ${themeSwitchColor}`}>
            {isLoading && <Spinner />}
         </div>
         <div style={{ height: 'calc(100vh - 64px)', overflowY: 'auto' }}>
            <ul className={`menu ${themeSwitchColor}`}>
               <div style={{ width: '100%', textAlign: 'right' }}>
               <ThemeSwitch />
               </div>
               <Links items={items} toggleMenu={toggleMenu} />
               <Copyrights />
            </ul>
         </div>
         <div className={`right ${themeSwitchColor}`}>
            <IconButton onClick={logout}>
               <ExitToAppRoundedIcon style={{ color: 'crimson' }} />
            </IconButton>
         </div>
         </div>
      </>
   )
}

const Copyrights = React.memo(() => {
   const { themeSwitchColorInvertNoBg } = useStyles()
   return <div style={{ marginTop: '5em', width: '100%', textAlign: 'center' }}>
      <Typography variant='caption' align='center' className={themeSwitchColorInvertNoBg}>
         {`© My copyrights - ${new Date().getFullYear()}`}
      </Typography>
   </div>
})

export default React.memo(Navbar)
