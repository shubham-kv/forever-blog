import React, {createContext, useRef} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import {setToken}		from 'slices/tokenSlice'
import ToastContainer	from 'components/ToastContainer'

import {getAccessToken} from 'fetches/auth'
import {REFRESH_INTERVAL, ToastDuration} from 'constants'


const AppContext = createContext()

const AppContextProvider = ({ children }) => {
	const dispatch = useDispatch()

	const toastContainerRef = useRef(null)
	const navigate = useNavigate()
	let timeoutId = -1

	const refreshAccessToken = async () => {
		const data = await getAccessToken()

		if(!data.hadFetchError) {
			const {ok, resData} = data

			if(ok) {
				dispatch(setToken(resData.accessToken))
				timeoutId = setTimeout(refreshAccessToken, REFRESH_INTERVAL)
			}
			else {
				navigate('/login', {replace: true})
			}
		}
		else {
			toastContainerRef.current.toastifyError('Failed to fetch!', ToastDuration.LONG)
		}
	}

	const stopRefreshingToken = () => {
		clearTimeout(timeoutId)
	}

	return (
		<AppContext.Provider value={[toastContainerRef, refreshAccessToken, stopRefreshingToken]}>
			<ToastContainer ref={toastContainerRef} />
			{ children }
		</AppContext.Provider>
	)
}

export {AppContext, AppContextProvider}
