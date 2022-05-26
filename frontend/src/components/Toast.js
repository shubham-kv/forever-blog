import React, {useEffect, useRef} from 'react'
import PropTypes from 'prop-types'

import styles from 'styles/toast.module.css'

import {ToastType} from 'constants'


export default function Toast({ id, type, text, duration, deleteCallback }) {
	const toastRef = useRef(null)
	const regressBarRef = useRef(null)

	// runs once after the component is mounted
	// if passed an [] as 2nd param
	useEffect(() => {
		regressBarRef.current.style.animationDuration = `${duration}ms`
	}, [])

	const die = () => {
		const fadeOutAnimDuration = 600
		toastRef.current.style.animation = `ToastFadeOut ${fadeOutAnimDuration}ms ease-in-out 1 forwards`

		setTimeout(() => {
			toastRef.current.style.display = 'none'
			deleteCallback(id)
		}, fadeOutAnimDuration)
	}

	const classList = [
		styles.toast,
		((type === ToastType.OK) ? styles.toastOk : ''),
		((type === ToastType.ERROR) ? styles.toastError : ''),
	]
	const toastClassName = classList.join(' ')

	return (
		<div
			ref={toastRef}
			className={toastClassName}
			onClick={die}
			onMouseEnter={() => {regressBarRef.current.style.animationPlayState = 'paused'}}
			onMouseLeave={() => {regressBarRef.current.style.animationPlayState = 'running'}}
			>

			<p className={styles.toastContent}>
				{text}
			</p>

			<div ref={regressBarRef} className={styles.toastRegressBar}
				onAnimationEnd={die} />

			{/* <span className='toast__cross_svg_wrapper' onClick={die}>
				<svg className='toast__cross_svg' width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M5.56024 3C9.5 5.5 12 7.89674 19.0002 16.76M3.00024 19C8.5 10.5 10 9.5 17.0802 3.64"
						stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
				</svg>
			</span> */}
		</div>
	)
}

Toast.propTypes = {
	id: PropTypes.number.isRequired,
	type: PropTypes.number,
	text: PropTypes.string.isRequired,
	duration: PropTypes.number.isRequired,
	deleteCallback: PropTypes.func.isRequired
}
