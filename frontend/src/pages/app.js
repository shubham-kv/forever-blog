import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'

import {AppContextProvider} from 'contexts/AppContext'

import PageNotFound from 'components/PageNotFound'
import AppLayout	from 'components/AppLayout'

import Feed 	from 'pages/feed'
import Posts 	from 'pages/posts'
import Register	from 'pages/register'
import Login 	from 'pages/login'
import Logout	from 'pages/logout'

export default function App() {
	return (
		<AppContextProvider>
			<Routes>
				<Route path='/' element={<AppLayout />}>
					<Route index element={<Navigate to='/feed' replace={true} />} />
					<Route path='feed/*' element={<Feed />} />
					<Route path='posts/*' element={<Posts />} />
				</Route>

				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
				<Route path='/logout' element={<Logout />} />
				
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</AppContextProvider>
	)
}
