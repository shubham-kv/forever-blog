import React, {useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'

import {selectToken} from 'slices/tokenSlice'
import {AppContext} from 'contexts/AppContext'

import Loading from 'components/Loading'
import {getPost} from 'fetches/posts'

import styles from 'styles/post.module.css'
import {ToastDuration} from 'constants'


export default function Post() {
	const accessToken = useSelector(selectToken)

	const [toastContainerRef] = useContext(AppContext)
	const params = useParams()
	const postId = params.postId

	const [post, setPost] = useState(null)

	const fetchPost = async () => {
		const data = await getPost(postId, accessToken)
		// const data = await getPost('6283882c0bb76999013f7cd2', accessToken)
		// await new Promise(r => setTimeout(r, 2000))

		if(!data.hadFetchError) {
			(data.ok)
				? setPost(data.resData.post)
				: toastContainerRef.current.toastifyError(data.resData.message, ToastDuration.LONG)
		}
		else {
			toastContainerRef.current.toastifyError('Failed to fetch!', ToastDuration.LONG)
		}
	}

	useEffect(() => {
		fetchPost()
	}, [])

	if(post === null) {
		return <Loading message='Loading post...' />
	}

	return (
		<article className={styles.post}>
			<div className={styles.header}>
				<img className={styles.authorImage}
					src={require('../assets/images/user.png').default}
					alt='user'/>

				<div className={styles.authorTimestampWrapper}>
					<p className={styles.author}>
						{post.author}
					</p>
					<p className={styles.timestamp}>
						{new Date(post.timestamp).toLocaleString('en-GB', {hour12: true})}
					</p>
				</div>
			</div>

			<h1 className={styles.postTitle}>
				{post.title}
			</h1>
			{
				post && post.body && post.body.split('\n').map((para, i) => (
					<p key={i}>{para}</p>
				))
			}
		</article>
	)
}
