import React, {useContext, useRef, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

import {AppContext} from 'contexts/AppContext'
import CustomInput	from 'components/CustomInput'
import CustomSelect	from 'components/CustomSelect'

import styles		from 'styles/register.module.css'
import utilStyles	from 'styles/utils.module.css'

import {createUser} from 'fetches/user'


const InputNames = Object.freeze({
	FIRST_NAME: 'first',
	LAST_NAME: 'last',
	GENDER: 'gender',
	DATE_OF_BIRTH: 'dateOfBirth',
	USERNAME: 'username',
	PASSWORD: 'password',
	CONFIRMED_PASSWORD: 'confirmedPassword'
})

const StatesEnum = Object.freeze({
	state1: 1, state2: 2, state3: 3
})

const disableFields = () => {
	const elements = document.querySelectorAll(`.${styles.register} input`)
	Array.from(elements).forEach(el => (el.disabled = true))
}

const enableFields = () => {
	const elements = document.querySelectorAll(`.${styles.register} input`)
	Array.from(elements).forEach(el => (el.disabled = false))
}


export default function Register() {
	const [,,toastCntnrRef] = useContext(AppContext),
		navigate = useNavigate(),

		firstNameInputRef = useRef(null),
		lastNameInputRef	= useRef(null),
		genderInputRef		= useRef(null),
		dobInputRef			= useRef(null),
		usernameInputRef	= useRef(null),
		pass1InputRef		= useRef(null),
		pass2InputRef		= useRef(null),
		window1 = useRef(null),
		window2 = useRef(null),
		window3 = useRef(null),

	[curState, setCurState] = useState(StatesEnum.state1)


	const validateData = () => {
		if(curState === StatesEnum.state1) {
			if(!firstNameInputRef.current.validate(true))
				return false

			if(!lastNameInputRef.current.validate(true))
				return false
			
			marchAhead()
		}
		else if(curState === StatesEnum.state2) {
			if(!genderInputRef.current.validate())
				return false

			if(!dobInputRef.current.validate(true))
				return false
			
			marchAhead()
		}
		else if(curState === StatesEnum.state3) {
			if(!usernameInputRef.current.validate(true))
				return false

			if(!pass1InputRef.current.validate(true))
				return false
			
			if(!pass2InputRef.current.validate(true))
				return false
			
			const pass1 = pass1InputRef.current.getValue()
			const pass2 = pass2InputRef.current.getValue()

			if(pass2 !== pass1) {
				pass2InputRef.current.setCustomError(`Passwords don't match!`)
				return false
			}

			return true
		}

		return false
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if(!validateData())
			return

		disableFields()
		
		const userData = {
			name: {
				first: firstNameInputRef.current.getValue(),
				last: lastNameInputRef.current.getValue(),
			},
			gender: genderInputRef.current.getValue(),
			dateOfBirth: new Date(dobInputRef.current.getValue()),
			username: usernameInputRef.current.getValue(),
			password: pass1InputRef.current.getValue()
		}

		const data = await createUser(userData)
		enableFields()

		if(!data.hadFetchError) {
			const {resData} = data

			if(data.ok) {
				const {message} = resData
				navigate(`/login`, {replace: true})
				toastCntnrRef.current.toastifySuccess(message)
			}
			else {
				const {key, message} = resData

				switch(key) {
					case InputNames.FIRST_NAME: {
						backwardAnim(window3, window1, StatesEnum.state1)
						firstNameInputRef.current.setCustomError(message)
						break
					}
					case InputNames.LAST_NAME: {
						backwardAnim(window3, window1, StatesEnum.state1)
						lastNameInputRef.current.setCustomError(message)
						break
					}
					case InputNames.GENDER: {
						backwardAnim(window3, window2, StatesEnum.state2)
						genderInputRef.current.setErrorState()
						break
					}
					case InputNames.DATE_OF_BIRTH: {
						backwardAnim(window3, window2, StatesEnum.state2)
						dobInputRef.current.setCustomError(message)
						break
					}
					case InputNames.USERNAME: {
						usernameInputRef.current.setCustomError(message)
						break
					}
					case InputNames.PASSWORD: {
						pass1InputRef.current.setCustomError(message)
						break
					}
					case InputNames.CONFIRMED_PASSWORD: {
						pass2InputRef.current.setCustomError(message)
						break
					}
					default:
						break
				}
				toastCntnrRef.current.toastifyError(message)
			}
		}
	}

	const forwardAnim = (curWindow, nextWindow, newState) => {
		curWindow.current.style.animation = 'FadeOutToLeft 0.2s ease-in-out 1 forwards'

		setTimeout(() => {
			curWindow.current.style = { display: 'none', opacity: 0, animation: null }			
			setCurState(newState)

			nextWindow.current.style.opacity = '0'
			nextWindow.current.style.display = 'flex'
			nextWindow.current.style.animation = 'FadeInFromRight 0.2s ease-in-out 1 forwards'
		}, 200)
	}

	const backwardAnim = (curWindow, prevWindow, newState) => {
		const animDuration = 200
		curWindow.current.style.animation = `FadeOutToRight ${animDuration}ms ease-in-out 1 forwards`

		setTimeout(() => {
			curWindow.current.style = { display: 'none', opacity: 0, animation: null }
			setCurState(newState)

			prevWindow.current.style.opacity = '0'
			prevWindow.current.style.display = 'flex'
			prevWindow.current.style.animation = `FadeInFromLeft ${animDuration}ms ease-in-out 1 forwards`
		}, animDuration)
	}

	// Animates to the next window.
	const marchAhead = () => {
		if(curState === StatesEnum.state1) {
			forwardAnim(window1, window2, StatesEnum.state2)
		} else if(curState === StatesEnum.state2) {
			forwardAnim(window2, window3, StatesEnum.state3)
		}
	}

	// Animates to the previous window.
	const retreat = () => {
		if(curState === StatesEnum.state2) {
			backwardAnim(window2, window1, StatesEnum.state1)
		}
		else if(curState === StatesEnum.state3) {
			backwardAnim(window3, window2, StatesEnum.state2)
		}
	}

	return (
		<div className={styles.registerContainer}>
			<div className={styles.register}>
				<h2 className={styles.registerHeader}>
					Register
				</h2>

				{
					(curState !== StatesEnum.state1) &&
						<button className={styles.backarrow} onClick={retreat}>
							<svg viewBox='0 0 30 25' xmlns='http://www.w3.org/2000/svg' role='img' aria-labelledby='register__back_arrow'>
								<title id='register__back_arrow'>Go back</title>
								<path d='M13.2157 2L2 12M2 12L13.2157 23M2 12H28'
									stroke='currentColor' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round'/>
							</svg>
						</button>
				}

				<form className={styles.registerForm} noValidate onSubmit={handleSubmit}>
					<div className={styles.registerAnimWindowWrapper}>
						<div ref={window1} className={(curState === StatesEnum.state1) ? styles.registerAnimWindowDisplayed : ''}>
							<CustomInput
								ref={firstNameInputRef}
								inputLabel='First name'
								inputName={InputNames.FIRST_NAME}
								inputType='text'
								pattern='[A-Za-z ]*'
								patternMismatchErrText='Only alphabets allowed!'
								minLength={1}
								maxLength={256}
								/>
								
							<CustomInput
								ref={lastNameInputRef}
								inputLabel='Last name'
								inputName={InputNames.LAST_NAME}
								inputType='text'
								pattern='[A-Za-z ]*'
								patternMismatchErrText='Only alphabets allowed!'
								minLength={1}
								maxLength={256}
								/>
						</div>

						<div ref={window2} className={(curState === StatesEnum.state2) ? styles.registerAnimWindowDisplayed : ''}>
							<CustomSelect
								ref={genderInputRef}
								legend='Select gender'
								name={InputNames.GENDER}
								values={[
									{id: 'gender_male', label: 'Male', value: 'male'},
									{id: 'gender_female', label: 'Female', value: 'female'}
								]}
								/>

							<CustomInput
								ref={dobInputRef}
								inputLabel='Date of Birth'
								inputName={InputNames.DATE_OF_BIRTH}
								inputType='date'
								/>
						</div>

						<div ref={window3} className={(curState === StatesEnum.state3) ? styles.registerAnimWindowDisplayed : ''}>
							<CustomInput
								ref={usernameInputRef}
								inputLabel='Username'
								inputName={InputNames.USERNAME}
								inputType='text'
								errText='Invalid Characters!'
								/>

							<CustomInput
								ref={pass1InputRef}
								inputLabel='Password'
								inputName={InputNames.PASSWORD}
								inputType='PASSWORD'
								/>

							<CustomInput
								ref={pass2InputRef}
								inputLabel='Confirm Password'
								inputName={InputNames.CONFIRMED_PASSWORD}
								inputType='PASSWORD'
								/>
						</div>
					</div>

					<input className={`${utilStyles.cbtn} ${utilStyles.cbtnRaised} ${styles.registerContinueBtn}`}
						type='submit' value='Continue' />
				</form>

				<p style={{margin: '1rem 0'}}>
					Already have an account ? <Link to='/login' replace className={utilStyles.clink}>Log in</Link>.
				</p>
			</div>
		</div>
	)
}
