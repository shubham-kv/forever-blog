import React from 'react'
import PropTypes from 'prop-types'

import styles from 'styles/dialog.module.css'
import utilStyles from 'styles/utils.module.css'


export default function Dialog({title, content, positiveBtnText, negativeBtnText, positiveBtnCallback, negativeBtnCallback, isRed}) {
	return (
		<div className={styles.dialog}>
			<div className={styles.dialogTitle}>
				{title}
			</div>
			<div className={styles.dialogText}>
				{content}
			</div>
			<div className={styles.dialogResBtns}>
				<button className={`${utilStyles.cbtn} ${styles.negativeBtn}`}
					onClick={negativeBtnCallback}>
					{negativeBtnText}
				</button>
				<button className={`${utilStyles.cbtnPrimary} ${isRed ? utilStyles.cbtnRed : ''} ${styles.positiveBtn}`}
					onClick={positiveBtnCallback}>
					{positiveBtnText}
				</button>
			</div>
		</div>
	)
}

Dialog.propTypes = {
	title: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	positiveBtnText: PropTypes.string.isRequired,
	negativeBtnText: PropTypes.string.isRequired,
	positiveBtnCallback: PropTypes.func,
	negativeBtnCallback: PropTypes.func,
}
