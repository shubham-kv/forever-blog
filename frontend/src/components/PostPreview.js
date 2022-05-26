import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import styles from 'styles/postPreview.module.css'
import utilStyles from 'styles/utils.module.css'


const PostPreview = ({linkTo, author, timestamp, title, content }) => {
	return (
		<div className={styles.postPreview}>
			<div className={styles.postHeader}>
				<img className={styles.authorImage}
					src={require('../assets/images/user.png').default}
					alt='user'
					width='24px' height='24px' />

				<div>
					<p className={styles.author}>
						{author}
					</p>
					<p className={styles.timestamp}>
						{timestamp}
					</p>
				</div>
			</div>

			<h2 className={styles.postPreviewTitle}>
				<Link to={linkTo} className={utilStyles.clink}>
					{title}
				</Link>
			</h2>

			<p className={styles.postPreviewContent}>
				{content}
			</p>
		</div>
	)
}

PostPreview.propTypes = {
	linkTo: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	timestamp: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired
}

export default PostPreview
