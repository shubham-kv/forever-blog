
import {BACKEND_HOST} from 'constants'

export const getAllPosts = async (accessToken) => {
	try {
		const res = await fetch(
			`${BACKEND_HOST}/api/posts`, {
				method: 'GET',
				headers: {'Authorization': `Bearer ${accessToken}`},
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

export const createPost = async (postData, accessToken) => {
	try {
		const res = await fetch(
			`${BACKEND_HOST}/api/posts`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${accessToken}`
				},
				body: JSON.stringify(postData)
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


export const getPost = async (postId, accessToken) => {
	try {
		const res = await fetch(
			`${BACKEND_HOST}/api/posts/${postId}`, {
				method: 'GET',
				headers: {'Authorization': `Bearer ${accessToken}`}
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

export const putPost = async (postData, accessToken) => {
	try {
		const res = await fetch(
			`${BACKEND_HOST}/api/posts/${postId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${accessToken}`
				},
				body: JSON.stringify(postData)
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

export const deletePost = async (postId, accessToken) => {
	try {
		const res = await fetch(
			`${BACKEND_HOST}/api/posts/${postId}`, {
				method: 'DELETE',
				headers: {'Authorization': `Bearer ${accessToken}`}
			}
		)
		const resData = await res.json()
		console.log(resData)
		return {ok: res.ok, resData}
	}
	catch(e) {
		console.log(e)
		return {hadFetchError: true}
	}
}
