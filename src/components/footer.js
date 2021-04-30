import React from 'react'
import { css } from '@emotion/react'
import styles from '../../theme'
import Logo from './logo'

const footerCSS = css`
	color: ${styles.colors.white};
	height: 70px;
	background: ${styles.colors.pink};
	font-size: 1rem;
	font-family: rockwell-nova, sans-serif;
	display: flex;
	align-items: baseline;
	justify-content: space-between;
	small {
		padding-right: 1rem;
	}
`

const Footer = () => (
	<div css={footerCSS}>
		<Logo hide={false} />
		<small
			css={css`
				font-size: 1rem;
			`}
		>
			© {new Date().getFullYear()}, Rachel Dozier-Ezell
		</small>
	</div>
)

export default Footer
