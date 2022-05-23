
import {BACKEND_HOST} from 'constants'

export const getFeed = async (accessToken) => {
	try {
		const res = await fetch(
			`${BACKEND_HOST}/api/feed`, {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${accessToken}`
				},
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

