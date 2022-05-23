
import {BACKEND_HOST} from 'constants'

export const createUser = async (userData) => {
	try {
		const res = await fetch(`${BACKEND_HOST}/api/users`, {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(userData)
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
