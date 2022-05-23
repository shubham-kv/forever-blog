import React, {useContext, useRef} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import {setToken}	from 'slices/tokenSlice'
import {AppContext} from 'contexts/AppContext'

import CustomInput	from 'components/CustomInput'

import styles		from 'styles/login.module.css'
import utilStyles	from 'styles/utils.module.css'

import {login} from 'fetches/auth'
import {REFRESH_INTERVAL, ToastDuration} from 'constants'



const InputNames = Object.freeze({
	USERNAME: 'username',
	PASSWORD: 'password'
})

const disableFields = () => {
	const elements = document.querySelectorAll(`.${styles.login} input`)
	Array.from(elements).forEach(el => (el.disabled = true))
}

const enableFields = () => {
	const elements = document.querySelectorAll(`.${styles.login} input`)
	Array.from(elements).forEach(el => (el.disabled = false))
}


export default function Login() {
	const dispatch = useDispatch()

	const usernameInputRef = useRef(null)
	const passwordInputRef = useRef(null)
	const [toastContainerRef, refreshAccessToken] = useContext(AppContext)
	const navigate = useNavigate()

	const validateData = () => {
		if(!usernameInputRef.current.validate(true)) {
			return false
		}
		if(!passwordInputRef.current.validate(true)) {
			return false
		}
		return true
	}

	const handleLogin = async (e) => {
		e.preventDefault()

		if(!validateData())
			return;

		disableFields()

		const credentials = {
			username: usernameInputRef.current.getValue(),
			password: passwordInputRef.current.getValue()
		}

		const data = await login(credentials)
		enableFields()

		if(!data.hadFetchError) {
			const {resData} = data

			if(data.ok) {
				dispatch(setToken(resData.accessToken))
				setTimeout(refreshAccessToken, REFRESH_INTERVAL)
				navigate('/', {replace: true})
				toastContainerRef.current.toastifySuccess(resData.message, ToastDuration.SHORT)
			}
			else {
				const {key, message} = resData

				usernameInputRef.current.clearExtraText()
				passwordInputRef.current.clearExtraText()

				if(InputNames.USERNAME === key) {
					usernameInputRef.current.setErrorState()
				} else if(InputNames.PASSWORD === key) {
					passwordInputRef.current.setErrorState()
				}
				toastContainerRef.current.toastifyError(message, ToastDuration.SHORT)
			}
		}
		else {
			toastContainerRef.current.toastifyError('Failed to fetch!', ToastDuration.LONG)
		}
	}

	return (
		<div className={styles.loginContainer}>
			<form className={styles.login} onSubmit={handleLogin} noValidate>

				<h2 className={styles.loginHeader}>Log in</h2>

				<div className={styles.loginInputWrapper}>
					<CustomInput
						ref={usernameInputRef}
						inputLabel='Username'
						inputName={InputNames.USERNAME}
						inputType='text'
						leadingIcon={
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='64 64 896 896' focusable='false' data-icon='user' width='1em' height='1em' fill='currentColor' aria-hidden='true'>
								<path d='M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z'></path>
							</svg>
							}
						/>

					<CustomInput
						ref={passwordInputRef}
						inputLabel='Password'
						inputName={InputNames.PASSWORD}
						inputType='password'
						leadingIcon={
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' focusable='false' width='1em' height='1em' fill='none' aria-hidden='true'>
									<path
										d='M7 10H4V23H20V10H17M7 10C7 10 5.82908 6.0296 7 4C8.13793 2.02758 9.72287 1 12 1C14.2771 1 15.8621 2.02758 17 4C18.1709 6.0296 17 10 17 10M7 10H17M12 19.5V16.5M12 16.5C12 16.5 10.5 15.8284 10.5 15C10.5 14.1716 11.1716 13.5 12 13.5C12.8284 13.5 13.5 14.1716 13.5 15C13.5 15.8284 12 16.5 12 16.5Z'
										stroke='currentColor' strokeWidth='1.8' ></path>
								</svg>
							}
						/>
				</div>

				<input className={styles.loginSubmitBtn} type='submit' value='Log In' />

				<p style={{margin: '1rem 0'}}>
					<Link to={`/register`} replace className={utilStyles.clink}>Register</Link> to create a new account.
				</p>
			</form>
		</div>
	)
}

