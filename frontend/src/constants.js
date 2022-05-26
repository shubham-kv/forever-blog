
export const BACKEND_HOST = 
	(process.env.NODE_ENV === 'production')
		? 'https://princev-simple-blog.herokuapp.com'
		: 'http://localhost:3000'

export const REFRESH_INTERVAL = 14 * 60 * 1000

export const ToastType = Object.freeze({
	DEFAULT: 0, OK: 1, ERROR: 2
})

export const ToastLength = Object.freeze({
	SHORT: 5000, LONG: 10000
})

export const FetchState = Object.freeze({
	LOADING: 1,
	ERROR: 2,
	SUCCESS: 3
})
