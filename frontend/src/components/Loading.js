import React, {useRef} from 'react'

import styles from 'styles/loading.module.css'


export default function Loading({message}) {
	const svgRef = useRef(null)

	return (
		<div className={styles.loadingContainer}>
			<div className={styles.loadingSvgWrapper}>
				<svg
					ref={svgRef}
					className={styles.loadingSvg}
					width="115" height="258" viewBox="0 0 115 258" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M101.008 39.4C100.155 34.4506 98.96 30.6106 97.424 27.88C96.0587 25.1493 93.328 23.784 89.232 23.784C87.5253 23.784 85.8187 24.1253 84.112 24.808C82.4053 25.32 80.8693 26.344 79.504 27.88C78.1387 29.416 77.0293 31.5493 76.176 34.28C75.3227 37.0106 74.896 40.5093 74.896 44.776V65H93.584V75.24H74.896V213.48C74.896 222.696 73.7013 230.12 71.312 235.752C69.0933 241.384 66.2773 245.736 62.864 248.808C59.4507 252.051 55.6107 254.184 51.344 255.208C47.248 256.403 43.408 257 39.824 257C34.704 257 29.84 256.147 25.232 254.44C20.624 252.904 16.528 250.6 12.944 247.528C9.36001 244.627 6.54401 241.043 4.49601 236.776C2.44801 232.68 1.42401 228.157 1.42401 223.208C1.42401 218.6 2.36268 214.589 4.24001 211.176C6.11734 207.933 8.67734 205.117 11.92 202.728C15.1627 200.339 19.0027 198.205 23.44 196.328C27.8773 194.451 32.7413 192.659 38.032 190.952V44.776C38.032 35.7306 39.1413 28.392 41.36 22.76C43.7493 16.9573 46.736 12.52 50.32 9.44798C53.904 6.20531 57.8293 4.07197 62.096 3.04797C66.3627 1.85331 70.4587 1.25598 74.384 1.25598C80.3574 1.25598 85.648 2.27998 90.256 4.32797C94.864 6.37598 98.7893 9.10664 102.032 12.52C105.275 15.9333 107.749 19.944 109.456 24.552C111.333 29.16 112.528 34.1093 113.04 39.4H101.008ZM14.992 221.416C14.992 223.635 15.4187 225.512 16.272 227.048C17.1253 228.755 18.2347 230.12 19.6 231.144C20.7947 232.168 22.16 232.936 23.696 233.448C25.232 233.96 26.5973 234.216 27.792 234.216C30.5227 234.216 32.912 232.765 34.96 229.864C37.1787 227.133 38.288 221.928 38.288 214.248V199.4C35.3867 200.424 32.4853 201.619 29.584 202.984C26.8533 204.349 24.464 205.885 22.416 207.592C20.1973 209.469 18.4053 211.517 17.04 213.736C15.6747 216.125 14.992 218.685 14.992 221.416Z"
						stroke="rgba(0, 0, 0, 0.2)" strokeWidth="2" strokeLinejoin="round" strokeLinecap='round'/>
				</svg>
			</div>
			<p className={styles.loadingMessage}>
				{message}
			</p>
		</div>
	)
}