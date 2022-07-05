import React, {useContext, useEffect, useState} from 'react'
import {Link, Routes, Route} from 'react-router-dom'
import {useSelector} from 'react-redux'

import {selectToken} from 'slices/tokenSlice'
import {AppContext} from 'contexts/AppContext'

import Loading 		from 'components/Loading'
import Error		from 'components/Error'
import PostPreview 	from 'components/PostPreview'
import Post 		from 'components/Post'
import NewPostForm 	from './new'

import styles from 'styles/posts.module.css'

import {getAllPosts} from 'fetches/posts'
import {FetchState} from 'constants'




const NewPostLink = () => (
	<Link className={styles.plusSvgWrapper} to='/posts/new'>
		<svg viewBox='0 0 512 512' fill='currentColor'><path d='M417.4,224H288V94.6c0-16.9-14.3-30.6-32-30.6c-17.7,0-32,13.7-32,30.6V224H94.6C77.7,224,64,238.3,64,256  c0,17.7,13.7,32,30.6,32H224v129.4c0,16.9,14.3,30.6,32,30.6c17.7,0,32-13.7,32-30.6V288h129.4c16.9,0,30.6-14.3,30.6-32  C448,238.3,434.3,224,417.4,224z' stroke='currentColor'/></svg>
	</Link>
)

const NoPosts = () => {
	return (
		<div className={styles.noPosts}>
			<p className={styles.noPostsEmptyEmoticon}>
				¯\_(ツ)_/¯
			</p>

			<h3 className={styles.noPostsHeader}>
				No posts created yet!
			</h3>

			<p className={styles.noPostsContent}>
				Click on the plus icon to create a new post.
			</p>

			<svg className={styles.noPostsPointingArrSvg} width='84' height='167' viewBox='0 0 84 167' fill='none' xmlns='http://www.w3.org/2000/svg'>
				<path d='M3.43555 2C3.43555 1.17157 2.76397 0.5 1.93555 0.5C1.10712 0.5 0.435547 1.17157 0.435547 2H3.43555ZM82.239 163.452C83.0411 163.245 83.5236 162.427 83.3166 161.625L79.9437 148.553C79.7367 147.751 78.9187 147.269 78.1165 147.476C77.3144 147.683 76.8319 148.501 77.0388 149.303L80.037 160.922L68.4176 163.92C67.6154 164.127 67.1329 164.946 67.3399 165.748C67.5469 166.55 68.3649 167.032 69.1671 166.825L82.239 163.452ZM0.435547 2C0.435547 41.7594 2.8155 71.6719 14.1453 96.8652C25.5043 122.124 45.7669 142.452 81.1022 163.292L82.6262 160.708C47.5973 140.048 27.8956 120.126 16.8813 95.6348C5.83782 71.0781 3.43555 41.7406 3.43555 2H0.435547Z'
				fill='currentColor' />
			</svg>

			<NewPostLink />
		</div>
	)
}

const PostList = () => {
	const accessToken = useSelector(selectToken)
	const [,,toastContainerRef] = useContext(AppContext)

	const [posts, setPosts] = useState(null)
	const [fetchState, setFetchState] = useState(FetchState.LOADING)
	const [errorMsg, setErrMsg] = useState('')

	const fetchPosts = async () => {
		setFetchState(FetchState.LOADING)
		const data = await getAllPosts(accessToken)

		if(!data.hadFetchError) {
			const {ok, resData} = data

			if(ok) {
				setFetchState(FetchState.SUCCESS)
				setPosts(resData.posts)
			}
			else {
				setFetchState(FetchState.ERROR)
				setErrMsg(resData.message)
				toastContainerRef.current.toastifyError(resData.message)
			}
		}
		else {
			setFetchState(FetchState.ERROR)
			setErrMsg('Failed to fetch')
			toastContainerRef.current.toastifyError('Failed to Fetch!')
		}
	}

	useEffect(() => {
		fetchPosts()
	}, [])

	if(fetchState === FetchState.LOADING) {
		return <Loading message='Loading your posts...' />
	}
	if((fetchState === FetchState.ERROR)) {
		return <Error message={errorMsg} retryCallback={fetchPosts} />
	}
	if(!posts) {
		return <Error message='Got some server error!!' retryCallback={fetchPosts} />
	}

	return (
		(posts.length > 0)
			? <div className={styles.postList}>
				<NewPostLink />
				{
					posts.map((post, i) => (
						<PostPreview
							key={i}
							linkTo={`/posts/${post.id}`}
							author={post.author}
							timestamp={new Date(post.timestamp).toLocaleString('en-GB', {hour12: true})}
							title={post.title}
							content={post.body}
							/>
					))
				}
			</div>
			: <NoPosts />
	)
}


export default function Posts() {
	return (
		<Routes>
			<Route path='/' element={<PostList />}/>
			<Route path='new' element={<NewPostForm />} />
			<Route path=':postId' element={<Post isEditable={true} />} />
		</Routes>
	)
}
