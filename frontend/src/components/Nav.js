import React from 'react'
import {Link} from 'react-router-dom'

import styles		from 'styles/nav.module.css'
import utilStyles	from 'styles/utils.module.css'


export default function Nav() {
	const links = [
		{ url: '/feed', label: 'Feed'},
		{ url: '/posts', label: 'Posts' },
		{ url: '/logout', label: 'Log out' }
	]
	const brandName = 'forever'

	return (
		<nav className={styles.nav}>
			<h1 className={styles.navHeader}>
				{brandName}
			</h1>

			<ul className={styles.navList}>
				{
					links.map((link, i) => (
						<li className={styles.navListItem} key={i}>
							<Link to={link.url} className={utilStyles.clink}>
								{link.label}
							</Link>
						</li>
					))
				}
			</ul>
		</nav>
	)
}
