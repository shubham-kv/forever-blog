
import {BACKEND_HOST} from 'constants'

export const login = async (credentials) => {
	try {
		const res = await fetch(
			`${BACKEND_HOST}/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify(credentials)
			}
		)
		const resData = await res.json()
		// return {ok: res.ok, resStatus:  res.status, resData}
		return {ok: res.ok, resData}
	}
	catch(e) {
		console.log(e)
		// return {ok: false, hadFetchError: true, error: e}
		return {hadFetchError: true}
	}
}

export const logout = async (accessToken) => {
	try {
		const res = await fetch(
			`${BACKEND_HOST}/auth/logout`, {
				method: 'DELETE',
				headers: {
					'Authorization': `Bearer ${accessToken}`
				},
				credentials: 'include'
			}
		);
		const resData = await res.json()
		return {ok: res.ok, resData}
	}
	catch(e) {
		console.log(e)
		return {hadFetchError: true}
	}
}

export const getAccessToken = async () => {
	try {
		const res = await fetch(
			`${BACKEND_HOST}/api/tokens`, {
				method: 'GET',
				credentials: 'include'
			}
		)
		const resData = await res.json()
		return {ok: res.ok, resData}
	}
	catch(e) {
		console.log(e)
		return {hadFetchError: true}
	}
}
