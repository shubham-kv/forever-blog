import React from 'react'
import Toast from 'components/Toast'
import styles from 'styles/toastContainer.module.css'

import {ToastType} from 'constants'


class ToastContainer extends React.Component {
	constructor(props) {
		super(props)

		this.state = { items: [] }
		this.showToast = this.showToast.bind(this)
		this.removeToast = this.removeToast.bind(this)
	}

	showToast(toastText, toastType, toastDuration) {
		const toastId = Date.now()

		this.setState((prevState) => ({
			items: [ ...prevState.items, {
				id: toastId,
				toast: <Toast id={toastId} type={toastType} text={toastText} duration={toastDuration} deleteCallback={this.removeToast} />
			}]
		}))
	}

	removeToast(id) {
		const filteredItems = this.state.items.filter((item) => (item.id !== id))

		this.setState({
			items: filteredItems
		})
	}

	toastifySuccess(message, toastDuration) {
		this.showToast(message, ToastType.OK, toastDuration)
	}

	toastifyError(error, toastDuration) {
		this.showToast(error, ToastType.ERROR, toastDuration)
	}

	render() {
		return (
			<div className={styles.toastContainer}>
				{
					this.state.items.map((item, i) => (
						{ ...item.toast, key: i }
					))
				}
			</div>
		)
	}
}

export default ToastContainer
