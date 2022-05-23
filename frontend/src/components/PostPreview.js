import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import styles from 'styles/postPreview.module.css'
import utilStyles from 'styles/utils.module.css'



const PostPreview = ({id, isEditable, linkTo, removeSelf, author, timestamp, title, content }) => {
	const now = Date.now()

	return (
		<div className={styles.postPreview}>
			<div className={styles.postHeader}>
				<div className={styles.postMetaWrapper}>
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

				{
					isEditable &&
					<div className={styles.iconsWrapper}>
						<button className={`${styles.normalizedBtn} ${styles.editBtn}`}>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' role='img' aria-labelledby={`edit_${now}`}><title id={`edit_${now}`}>Edit</title><path d='M6 34.5v7.5h7.5l22.13-22.13-7.5-7.5-22.13 22.13zm35.41-20.41c.78-.78.78-2.05 0-2.83l-4.67-4.67c-.78-.78-2.05-.78-2.83 0l-3.66 3.66 7.5 7.5 3.66-3.66z' fill='currentColor'/></svg>
						</button>

						<button className={`${styles.normalizedBtn} ${styles.deleteBtn}`}
							onClick={() => {removeSelf(id)}}>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' role='img' aria-labelledby={`delete_${now}`}><title id={`delete_${now}`}>Delete</title><path d='M12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4V14H12v24zM38 8h-7l-2-2H19l-2 2h-7v4h28V8z' fill='currentColor'/></svg>
						</button>
					</div>
				}
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
	isEditable: PropTypes.bool,
	linkTo: PropTypes.string.isRequired,
	removeSelf: PropTypes.func,

	author: PropTypes.string.isRequired,
	timestamp: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired
}

export default PostPreview
