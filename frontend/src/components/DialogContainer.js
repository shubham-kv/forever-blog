import React from 'react'

import styles from 'styles/dialogContainer.module.css'


class DialogContainer extends React.Component {
	constructor(props) {
		super(props)

		this.rootRef = React.createRef(null)
		this.state = {
			dialog: null
		}

		this.setDialog = this.setDialog.bind(this)
		this.closeDialog = this.closeDialog.bind(this)
		this.fadeOut = this.fadeOut.bind(this)
	}

	setDialog(dialog) {
		this.setState({
			dialog: dialog
		})
	}

	closeDialog() {
		const duration = 300
		this.fadeOut(duration)

		setTimeout(() => {
			this.setState({dialog: null})
		}, duration)
	}

	fadeOut(durationInMillis) {
		this.rootRef &&
		this.rootRef.current &&
		(this.rootRef.current.style.animation = `DialogFadeOut ${durationInMillis}ms ease-out 1`)
	}

	render() {
		return (
			this.state.dialog &&
				<div ref={this.rootRef} className={styles.dialogContainer}>
					{this.state.dialog}
				</div>
		)
	}
}

export default DialogContainer
