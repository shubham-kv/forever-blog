import React, {useContext, useEffect, useRef, useState} from 'react'
import {useSelector} from 'react-redux'

import {selectToken} from 'slices/tokenSlice'
import {AppContext} from 'contexts/AppContext'

import CustomInput from 'components/CustomInput'

import styles		from 'styles/posts.module.css'
import utilStyles	from 'styles/utils.module.css'

import {createPost} from 'fetches/posts'


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


export default function NewPostForm() {
	const accessToken = useSelector(selectToken)

	const titleInputRef = useRef(null)
	const bodyInputRef = useRef(null)
	const [,,toastContainerRef] = useContext(AppContext)

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

		const data = await createPost(postData, accessToken)
		enableFields()

		if(!data.hadFetchError) {
			const {resData} = data

			if(data.ok) {
				toastContainerRef.current.toastifySuccess(resData.message)
				titleInputRef.current.setValue('')
				bodyInputRef.current.setValue('')
			}
			else {
				const {key, message} = resData

				if(InputNames.TITLE === key) {
					titleInputRef.current.setCustomError(resData.message)
				} else if(InputNames.BODY === key) {
					bodyInputRef.current.setCustomError(resData.message)
				}

				toastContainerRef.current.toastifyError(message)
			}
		}
	}

	return (
		<form className={styles.postForm} noValidate onSubmit={handleSubmit}>
			<h3 className={styles.pfHeader}>
				Create a new post
			</h3>

			<CustomInput
				ref={titleInputRef}
				inputLabel='Title'
				inputName={InputNames.TITLE}
				inputType='text'
				className={styles.pfCinput}
			/>

			<CustomInput
				ref={bodyInputRef}
				inputLabel='Body'
				inputName={InputNames.BODY}
				inputType='text'
				className={`${styles.pfCinput} ${styles.pfCinputBody}`}
				multiline
			/>

			<input className={utilStyles.cbtn} type='submit' value='Submit' />
		</form>
	)
}

