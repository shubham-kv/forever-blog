import React from 'react'
import PropTypes from 'prop-types'

import styles from 'styles/error.module.css'
import utilStyles from 'styles/utils.module.css'

export default function Error({message, retryCallback}) {
	return (
		<div className={styles.errRoot}>
			<p className={styles.errEmoticon}>
				{'(._.)'}
			</p>
			<p className={styles.errMessage}>
				{message}
			</p>
			{
				retryCallback &&
				<button onClick={retryCallback} className={utilStyles.cbtn}>
					Try again
				</button>
			}
		</div>
	)
}

Error.propTypes = {
	message: PropTypes.string.isRequired,
	retryCallback: PropTypes.func
}
