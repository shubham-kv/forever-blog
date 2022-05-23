import React, {useContext, useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'

import {selectToken} from 'slices/tokenSlice'
import {AppContext} from 'contexts/AppContext'

import Loading from 'components/Loading'
import Nav from 'components/Nav'

import styles from 'styles/layout.module.css'


export default function AppLayout() {
	const accessToken = useSelector(selectToken)
	const [, refreshAccessToken] = useContext(AppContext)

	useEffect(() => {
		if(!accessToken)
			refreshAccessToken()
	}, [])

	if(!accessToken) {
		return <Loading message='Loading...' />
	}

	return (
		<div className={styles.container}>
			<Nav />
			<main className={styles.main}>
				<Outlet />
			</main>
		</div>
	)
}
