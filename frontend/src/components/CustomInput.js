import React from 'react'
import PropTypes from 'prop-types'

import styles from 'styles/customInput.module.css'


class CustomInput extends React.Component {
	constructor(props) {
		super(props)
		this.inputRef = React.createRef()
		this.customInputRef = React.createRef()

		this.state = {
			value: this.props.value ? this.props.value : '',
			extraText: ''
		}

		this.onFocusHandler = this.onFocusHandler.bind(this)
		this.onBlurHandler = this.onBlurHandler.bind(this)
		this.onInputHandler = this.onInputHandler.bind(this)
		this.validate = this.validate.bind(this)

		this.getValue = this.getValue.bind(this)
		this.setValue = this.setValue.bind(this)
		this.setErrorState = this.setErrorState.bind(this)
		this.setCustomError = this.setCustomError.bind(this)
		this.clearExtraText = this.clearExtraText.bind(this)
	}

	componentDidMount() {
		if(this.state.value !== '') {
			this.customInputRef.current.classList.add(styles.cinputNotEmpty)
		}
	}

	onFocusHandler() {
		this.customInputRef.current.classList.add(styles.cinputFocused)
	}
	
	onBlurHandler() {
		this.inputRef.current.value = this.inputRef.current.value.trim()
		this.customInputRef.current.classList.remove(styles.cinputFocused)
	}

	// onChange is mapped to oninput, big react mistake, so no use
	onInputHandler(e) {
		this.setState((prevState) => ({
			...prevState,
			value: e.target.value
		}))

		if(e.target.value !== '') {
			this.validate(false)
			this.customInputRef.current.classList.add(styles.cinputNotEmpty)
		}
		else {
			this.customInputRef.current.classList.remove(styles.cinputErroneous)
			this.customInputRef.current.classList.remove(styles.cinputNotEmpty)
		}
	}

	validate(focus) {
		if(this.inputRef.current && !this.inputRef.current.validity.valid) {
			this.customInputRef.current.classList.add(styles.cinputErroneous)

			if(this.inputRef.current.validity.valueMissing) {
				this.setState({extraText: this.inputRef.current.validationMessage})
				
				if(focus) {
					this.inputRef.current.focus()
				}
			}
			else if(this.inputRef.current.validity.patternMismatch) {
				this.setState({extraText: this.props.patternMismatchErrText})
			}
			else if(this.inputRef.current.validity.tooShort) {
				this.setState({extraText: `Minimum ${this.inputRef.current.minLength} character(s) required!`})
			}
			else if(this.inputRef.current.validity.tooLong) {
				this.setState({extraText: `Maximum ${this.inputRef.current.minLength} character(s) required!`})
			}
			return false
		}
		else {
			this.customInputRef.current && this.customInputRef.current.classList.remove(styles.cinputErroneous)
			return true
		}
	}

	setErrorState() {
		this.customInputRef.current.classList.add(styles.cinputErroneous)
	}

	setCustomError(errText) {
		this.setErrorState()
		this.setState({extraText: errText})
	}

	clearExtraText() {
		this.setState({extraText: ''})
	}

	getValue() {
		// return this.inputRef.current.value
		return this.state.value
	}

	setValue(value) {
		// this.inputRef.current.value = value
		this.setState((prevState) => ({
			...prevState,
			value: value
		}))
	}

	render() {
		const {className, inputType, inputName, inputLabel, pattern, multiline, minLength, maxLength, leadingIcon} = this.props

		return (
			<div ref={this.customInputRef} className={`${styles.cinput} ${className}`}>
				<div className={styles.cinputInputWrapper}>

					{
						(multiline)
							? <textarea
								ref={this.inputRef}
								className={`${styles.cinputInput} ${styles.cinputTextarea}`} id={`input_${inputName}`}
								spellCheck='false'
								type={inputType}
								name={inputName}
								value={this.state.value}
								required
								onFocus={this.onFocusHandler} onBlur={this.onBlurHandler}
								onInput={this.onInputHandler}
								minLength={minLength} maxLength={maxLength}
								/>

							: <input
								ref={this.inputRef}
								className={styles.cinputInput} id={`input_${inputName}`}
								spellCheck='false'
								type={inputType}
								name={inputName}
								required
								value={this.state.value}
								pattern={pattern}
								onFocus={this.onFocusHandler} onBlur={this.onBlurHandler}
								onInput={this.onInputHandler}
								minLength={minLength} maxLength={maxLength}
								/>
					}

					<label
						className={styles.cinputFloatingLabel}
						htmlFor={`input_${inputName}`}
						style={(leadingIcon ? { left: '2.5rem' } : { left: '1rem' })}>
							{inputLabel}
					</label>

					{
						leadingIcon &&
							<span className={styles.cinputLeadingIcon}>
								{leadingIcon}
							</span>
					}
					<span className={styles.cinputOutline} />
				</div>
				<span className={styles.cinputExtraText}>
					{this.state.extraText}
				</span>
			</div>
		)
	}
}

CustomInput.propTypes = {
	inputType: PropTypes.string.isRequired,
	inputName: PropTypes.string.isRequired,
	inputLabel: PropTypes.string.isRequired,
	value: PropTypes.string,
	pattern: PropTypes.string,
	patternMismatchErrText: PropTypes.string,
	multiline: PropTypes.bool,
	minLength: PropTypes.number,
	maxLength: PropTypes.number,
	leadingIcon: PropTypes.object
}

export default CustomInput
