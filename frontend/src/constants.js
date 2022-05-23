
export const BACKEND_HOST = (process.env.NODE_ENV === 'production')
								? 'https://princev-simple-blog.herokuapp.com'
								: 'http://localhost:3000'

export const REFRESH_INTERVAL = 14 * 60 * 1000

export const ToastType = Object.freeze({
	OK: 1, ERROR: 2
})

export const ToastDuration = Object.freeze({
	SHORT: 3000, LONG: 6000
})

// Status for components
export const Status = Object.freeze({
	IDLE: 0,
	LOADING: 1,
	ERROR: 2,
	SUCCESS: 3
})
