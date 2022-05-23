import React from 'react'

import styles from 'styles/pageNotFoud.module.css'


export default function PageNotFound() {
	return (
		<section className={styles.pnfRoot}>
			<p className={styles.pnfEmoticon}>
				{'(._.)'}
			</p>
			<h2 className={styles.pnfHeader}>404</h2>
			<p className={styles.pnfContent}>
				Sorry!! The requested page was not found.
			</p>
		</section>
	)
}

