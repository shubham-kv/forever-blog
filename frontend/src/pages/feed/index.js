import React, {useContext, useEffect, useState} from 'react'
import {Routes, Route} from 'react-router-dom'
import {useSelector} from 'react-redux'

import {selectToken} from 'slices/tokenSlice'
import {AppContext} from 'contexts/AppContext'

import Loading		from 'components/Loading'
import PostPreview	from 'components/PostPreview'
import Post			from 'components/Post'

import {getFeed} from 'fetches/feed'
import styles from 'styles/feed.module.css'

import {ToastDuration} from 'constants'



function FeedList({feed}) {
	return (
		<div className={styles.feed}>
			{
				feed.map((post, i) => (
					<PostPreview
						key={i}
						linkTo={`/feed/${post.id}`}
						author={post.author}
						timestamp={new Date(post.timestamp).toLocaleString('en-GB', {hour12: true})}
						title={post.title}
						content={post.body}
						/>
				))
			}
		</div>
	)
}



export default function Feed() {
	const accessToken = useSelector(selectToken)

	const [toastContainerRef] = useContext(AppContext)
	const [feed, setFeed] = useState(null)

	const fetchFeed = async () => {
		const data = await getFeed(accessToken)

		if(!data.hadFetchError) {
			if(data.ok) {
				setFeed(data.resData.posts)
			}
			else {
				console.log(data.resData)
				toastContainerRef.current.toastifyError(data.resData.message, ToastDuration.LONG)
			}

			// (data.ok)
			// 	? setFeed(data.resData.posts)
			// 	: toastContainerRef.current.toastifyError(data.resData.message, ToastDuration.LONG)
		}
		else {
			toastContainerRef.current.toastifyError('Failed to fetch!', ToastDuration.LONG)
		}
	}

	useEffect(() => {
		fetchFeed()
	}, [])

	if(feed === null) {
		return <Loading message='Fetching your feed...' />
	}
	
	if(feed.length === 0) {
		return 'Nothing to feed!'
	}

	return (
		<Routes>
			<Route path='/' element={<FeedList feed={feed} />} />
			{/* <Route path='/' element={<Post />} /> */}
			<Route path=':postId' element={<Post />} />
		</Routes>
	)
}
