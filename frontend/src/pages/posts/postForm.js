import React, {useContext, useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'

import {selectToken} from 'slices/tokenSlice'
import {AppContext} from 'contexts/AppContext'

import CustomInput from 'components/CustomInput'

import styles		from 'styles/posts.module.css'
import utilStyles	from 'styles/utils.module.css'

import {ToastDuration} from 'constants'


const InputNames = Object.freeze({
	TITLE: 'title',
	BODY: 'body'
})

const disableFields = () => {
	const elements = document.querySelectorAll(`.${styles.postForm} input, .${styles.postForm} textarea`)
	Array.from(elements).forEach(el => (el.disabled = true))
}

const enableFields = () => {
	const elements = document.querySelectorAll(`.${styles.postForm} input, .${styles.postForm} textarea`)
	Array.from(elements).forEach(el => (el.disabled = false))
}



export default function PostForm({header, postSubmitter}) {
	const accessToken = useSelector(selectToken)
	const params = useParams()
	const postId = params.postId

	const titleInputRef = useRef(null)
	const bodyInputRef = useRef(null)
	const [toastContainerRef] = useContext(AppContext)

	const [post, setPost] = useState(null)
	
	const fetchPost = async () => {
		const data = await getPost(postId, accessToken)

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
		if(postId)
			fetchPost()
	}, [])


	const validateData = () => {
		if(!titleInputRef.current.validate(true)) {
			return false
		}
		if(!bodyInputRef.current.validate(true)) {
			return false
		}
		return true
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if(!validateData())
			return;

		disableFields()

		const postData = {
			title: titleInputRef.current.getValue(),
			body: bodyInputRef.current.getValue()
		}

		const data = await postSubmitter(postData, accessToken)
		enableFields()

		if(!data.hadFetchError) {
			const {resData} = data

			if(data.ok) {
				toastContainerRef.current.toastifySuccess(resData.message, ToastDuration.SHORT)
				titleInputRef.current.setValue('')
				bodyInputRef.current.setValue('')
			}
			else {
				const {key, message} = resData

				titleInputRef.current.clearExtraText()
				bodyInputRef.current.clearExtraText()

				if(InputNames.TITLE === key) {
					titleInputRef.current.setErrorState()
				} else if(InputNames.BODY === key) {
					bodyInputRef.current.setErrorState()
				}

				toastContainerRef.current.toastifyError(message, ToastDuration.LONG)
			}
		}
	}

	return (
		<form className={styles.postForm} noValidate onSubmit={handleSubmit}>
			<h3 className={styles.pfHeader}>
				{header}
			</h3>

			<CustomInput
				ref={titleInputRef}
				inputLabel='Title'
				inputName={InputNames.TITLE}
				inputType='text'
				className={styles.pfCinput}
				value={(post && post.title) ? post.title : ''}
			/>

			<CustomInput
				ref={bodyInputRef}
				inputLabel='Body'
				inputName={InputNames.BODY}
				inputType='text'
				className={`${styles.pfCinput} ${styles.pfCinputBody}`}
				multiline
				value={(post && post.body) ? post.body : ''}
			/>

			<input className={utilStyles.cbtn} type='submit' value='Submit' />
		</form>
	)
}

PostForm.propTypes = {
	header: PropTypes.string.isRequired,
	postSubmitter: PropTypes.func.isRequired,
}

