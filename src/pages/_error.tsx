import React, { useCallback, useEffect } from 'react'
import { Button, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import { ZenPalette } from '@_palette'
import { useConfigStore } from '@_zustand/config'
import { useRouter } from 'next/router'
import { ZenRouteID } from '@_utils/routes/types'
import { routesPaths } from '@_utils/routes'

const useStyles = makeStyles((theme: Theme) => ({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100vw',
		height: '100vh',
		background: theme.type === 'dark' ? '#111' : '#fafafa',
		color: 'white',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	item: {
      marginBottom: '2em',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	verticalDivider: {
		width: 2,
		height: '3.7rem',
		backgroundColor: ZenPalette.typographyGrey,
		opacity: '.5',
		margin: '0 1em'
	}
}))

const Error = props => {
	const { statusCode } = props
   const classes = useStyles()
   const setActiveRoute = useConfigStore(state => state.setActiveRoute)
   const router = useRouter()
   
   useEffect(() => {
      setActiveRoute(ZenRouteID.ERROR)
   }, [setActiveRoute])

   const goBackToSafety = useCallback(() => {
      const homePath = routesPaths[ZenRouteID.DASHBOARD].path
      router.push(homePath)
   }, [router.push])
   
	return (
		<Grid className={classes.container} container justify='center' alignContent='center'>
			<div className={classes.item}>
				<Typography variant='h1'>{statusCode || '000'}</Typography>
				<div className={classes.verticalDivider} />
				<Grid item>
					<Typography variant='body1'>{statusCode === 404 ? 'Page' : 'Oops!'}</Typography>
					<Typography variant='body1'>
						{statusCode === 404 ? 'Not found' : "Something's wrong, i can feel it"}
					</Typography>
				</Grid>
			</div>
         <Grid item>
            <Button color='primary' onClick={goBackToSafety}>
               Take me back to safety!
            </Button>
         </Grid>
		</Grid>
	)
}

Error.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404
	return { statusCode }
}

export default Error
