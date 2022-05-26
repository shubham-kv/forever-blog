import React, {useContext, useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import {useParams, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

import {selectToken} from 'slices/tokenSlice'
import {AppContext} from 'contexts/AppContext'

import Loading		from 'components/Loading'
import Error		from 'components/Error'
import CustomInput	from 'components/CustomInput'
import Dialog		from 'components/Dialog'

import {getPost, updatePost, deletePost}	from 'fetches/posts'

import styles		from 'styles/post.module.css'
import utilStyles	from 'styles/utils.module.css'
import {FetchState, ToastLength} from 'constants'



const EditPostFormDialog = ({postId, initialData, setPost}) => {
	const accessToken = useSelector(selectToken)
	const [,, toastContainerRef, dialogContainerRef] = useContext(AppContext)

	const titleInputRef = useRef(null)
	const contentInputRef = useRef(null)
	const saveBtnRef = useRef(null)

	const validate = () => {
		if(!titleInputRef.current.validate())
			return false
		
		if(!contentInputRef.current.validate())
			return false
		
		return true
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if(!validate()) {
			return
		}

		const postData = {
			title: titleInputRef.current.getValue(),
			body: contentInputRef.current.getValue()
		}

		if(postData.title === initialData.title && postData.body === initialData.body) {
			saveBtnRef.current.disabled = true
			return
		}

		const data = await updatePost(postId, postData, accessToken)

		if(!data.hadFetchError) {
			const {ok, resData} = data

			if(ok) {
				toastContainerRef.current.toastifySuccess('Saved !!')
				setPost(resData.post)
				dialogContainerRef.current.closeDialog()
			}
			else {
				const {key, message} = resData
				
				if(key === 'title') {
					titleInputRef.current.setCustomError(message)
				} else if(key === 'body') {
					contentInputRef.current.setCustomError(message)
				}
				toastContainerRef.current.toastifyError(message)
			}
		}
		else {
			toastContainerRef.current.toastifyError('Failed to fetch')
		}
	}

	const handleTitleInput = (e) => {
		saveBtnRef.current.disabled = ((e.target.value === initialData.title) || (e.target.value === ''))
	}
	
	const handleContentInput = (e) => {
		saveBtnRef.current.disabled = ((e.target.value === initialData.body) || (e.target.value === ''))
	}

	return (
		<div className={styles.epfDialog}>
			<h3>Edit post</h3>
			<form onSubmit={handleSubmit} noValidate>
				<CustomInput
					ref={titleInputRef}
					className={styles.editPostFormTitleInput}
					inputLabel='Title'
					inputName='postTitle'
					inputType='text'
					value={initialData.title}
					onInputCallback={handleTitleInput}
					/>

				<CustomInput
					ref={contentInputRef}
					className={styles.editPostFormContentInput}
					inputLabel='Content'
					inputName='postContent'
					inputType='text'
					multiline={true}
					value={initialData.body}
					onInputCallback={handleContentInput}
					/>

				<div className={styles.epfDialogBtns}>
					<input type='button' className={`${utilStyles.cbtn}`}
						value='Cancel' onClick={dialogContainerRef.current.closeDialog}/>

					<input ref={saveBtnRef}
						type='submit'
						className={`${utilStyles.cbtn} ${utilStyles.cbtnRaised} ${styles.editPostFormSubmitBtn}`}
						disabled
						value='SAVE'/>
				</div>
			</form>
		</div>
	)
}


const DeletePostDialog = ({postId}) => {
	const accessToken = useSelector(selectToken)
	const [,, toastContainerRef, dialogContainerRef] = useContext(AppContext)
	const navigate = useNavigate()

	const deleteThePost = async () => {
		const data = await deletePost(postId, accessToken)

		if(!data.hadFetchError) {
			(data.ok)
				? toastContainerRef.current.toastifyError('Deleted !!', ToastLength.SHORT)
				: toastContainerRef.current.toastifyError(data.resData.message)
		}
		else {
			toastContainerRef.current.toastifyError(data.resData.message)
		}
	}

	const positiveBtnCallback = () => {
		deleteThePost();
		dialogContainerRef.current.closeDialog()
		navigate('/posts', {replace:true})
	}

	return (
		<Dialog
			title='Delete post'
			content='Do you really want to delete this ?? This is an irreversible process, so proceed with care.'
			positiveBtnText='Delete'
			negativeBtnText='Cancel'
			isRed={true}
			negativeBtnCallback={dialogContainerRef.current.closeDialog}
			positiveBtnCallback={positiveBtnCallback}
			/>
	)
}


export default function Post({isEditable}) {
	const now = Date.now(),
		accessToken	= useSelector(selectToken),

		[,, toastCntnrRef, dialogContainerRef] = useContext(AppContext),

		postTitleRef	= useRef(null),
		postContentRef	= useRef(null),

		params = useParams(),
		postId = params.postId,
		[post, setPost] = useState(null),
		[fetchState, setFetchState] = useState(FetchState.LOADING)


	const fetchPost = async () => {
		setFetchState(FetchState.LOADING)
		const data = await getPost(postId, accessToken)

		if(!data.hadFetchError) {
			if(data.ok) {
				setFetchState(FetchState.SUCCESS)
				setPost(data.resData.post)
			} else {
				setFetchState(FetchState.ERROR)
				toastCntnrRef.current.toastifyError(data.resData.message)
			}
		}
		else {
			setFetchState(FetchState.ERROR)
			toastCntnrRef.current.toastifyError('Failed to fetch!')
		}
	}

	useEffect(() => {
		fetchPost()
	}, [])
	
	const editBtnClickHandler = () => {
		dialogContainerRef.current.setDialog(
			<EditPostFormDialog
				postId={postId}
				initialData={{
					title: post.title,
					body: post.body
				}}
				setPost={setPost} />
		)
	}
	
	const deleteBtnClickHandler = () => {
		dialogContainerRef.current.setDialog(<DeletePostDialog postId={postId}/>)
	}

	if(fetchState === FetchState.LOADING) {
		return <Loading message='Loading post...' />
	}
	if((fetchState === FetchState.ERROR) || !post) {
		return <Error message='Got some server error!!' retryCallback={fetchPost} />
	}

	return (
		<article className={styles.post}>
			<div className={styles.header}>
				<div className={styles.postMetaWrapper}>
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

				{
					isEditable &&
					<div className={styles.iconsBtnsWrapper}>
						<button className={styles.normalizedBtn} onClick={editBtnClickHandler}>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' role='img' aria-labelledby={`edit_${now}`}><title id={`edit_${now}`}>Edit</title><path d='M6 34.5v7.5h7.5l22.13-22.13-7.5-7.5-22.13 22.13zm35.41-20.41c.78-.78.78-2.05 0-2.83l-4.67-4.67c-.78-.78-2.05-.78-2.83 0l-3.66 3.66 7.5 7.5 3.66-3.66z' fill='currentColor'/></svg>
						</button>

						<button className={styles.normalizedBtn} onClick={deleteBtnClickHandler}>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' role='img' aria-labelledby={`delete_${now}`}><title id={`delete_${now}`}>Delete</title><path d='M12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4V14H12v24zM38 8h-7l-2-2H19l-2 2h-7v4h28V8z' fill='currentColor'/></svg>
						</button>
					</div>
				}
			</div>

			<h1 ref={postTitleRef} className={`${styles.postTitle}`}>
				{post.title}
			</h1>
			<div ref={postContentRef} className={styles.postContent}>
				{
					post && post.body && post.body.split('\n').map((para, i) => (
						<p key={i}>{para}</p>
					))
				}
			</div>
		</article>
	)
}

Post.propTypes = {
	isEditable: PropTypes.bool
}
