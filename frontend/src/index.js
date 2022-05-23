import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'

import store from './store'
import App from 'pages/app'

import 'styles/normalize.css'
import 'styles/globals.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

const RootComponent = () => (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
)

root.render(
	(process.env.NODE_ENV === 'production')
		? <RootComponent />
		: <React.StrictMode><RootComponent/></React.StrictMode>
)
