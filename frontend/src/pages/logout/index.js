import React, {useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import {setToken, selectToken} from 'slices/tokenSlice'
import {AppContext} from 'contexts/AppContext'

import Loading from 'components/Loading'

import {logout} from 'fetches/auth'



export default function Logout() {
	const accessToken = useSelector(selectToken)
	const dispatch = useDispatch()

	const [, stopRefreshingToken, toastContainerRef] = useContext(AppContext)
	const navigate = useNavigate()
	
	const handleLogout = async () => {
		const fetchResult = await logout(accessToken)

		if(!fetchResult.hadFetchError) {
			const {ok, resData} = fetchResult

			if(ok) {
				toastContainerRef.current.toastifySuccess(resData.message)
			} else {
				toastContainerRef.current.toastifyError(resData.message)
			}
		}
		else {
			toastContainerRef.current.toastifyError('Failed to fetch!')
		}

		dispatch(setToken(''))
		stopRefreshingToken()
		navigate('/login', {replace: true})
	}

	useEffect(() => {
		handleLogout()
	}, [])

	return (
		<Loading message='Logging out...' />
	)
}
