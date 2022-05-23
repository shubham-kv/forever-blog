import React from 'react'
import PropTypes from 'prop-types'

import styles from 'styles/customSelect.module.css'


class CustomSelect extends React.Component {
	constructor(props) {
		super(props)

		this.fieldsetRef = React.createRef(null)

		this.validate = this.validate.bind(this)
		this.setErrorState = this.setErrorState.bind(this)
		this.removeErrorState = this.removeErrorState.bind(this)
		this.getValue = this.getValue.bind(this)
	}

	validate() {
		const el = document.querySelector(`.${styles.cselect} input[name='${this.props.name}']:checked`)
		if(!el) {
			this.setErrorState()
			return false
		}
		return true
	}

	setErrorState() {
		this.fieldsetRef.current.classList.add(`${styles.cselectErrorneous}`)
	}

	removeErrorState() {
		this.fieldsetRef.current.classList.remove(`${styles.cselectErrorneous}`)
	}

	getValue() {
		const el = document.querySelector(`.${styles.cselect} input[name='${this.props.name}']:checked`)
		return el ? el.value : ''
	}

	render() {
		const {legend, values, name} = this.props

		return (
			<fieldset ref={this.fieldsetRef} className={styles.cselect}>
				<legend>{legend}</legend>

				{
					values.map((value, i) => (
						<div key={i} className={styles.cselectRadioWrapper}>
							<input
								className={styles.cselectInput}
								id={value.id}
								type='radio'
								name={name} value={value.value} readOnly
								onChange={this.removeErrorState}
								/>
	
							<label htmlFor={value.id}>
								{value.label}
							</label>
						</div>
					))
				}
			</fieldset>
		)
	}
}

CustomSelect.propTypes = {
	legend: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	
	values: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
	})).isRequired
}

export default CustomSelect
