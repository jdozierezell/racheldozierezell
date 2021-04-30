import React from 'react'
import { getSrc } from 'gatsby-plugin-image'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import styles from '../../theme'
import mq from '../helpers/media-queries'

const styledHeaderImage = css`
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background-repeat: no-repeat;
	background-size: cover;
	${mq[1]} {
		width: 100vw;
		height: 60vh;
	}
`
const titleHeader = css`
	font-family: ${styles.fonts.rockwell};
	text-align: center;
	position: relative;
	font-size: 36pt;
	top: 6rem;
	line-height: 0.9;
	filter: drop-shadow(5px 5px 5px ${styles.colors.black});
`
const HeaderImage = props => {
	const { image, large, title, background, coverPosition } = props
	let backgroundImage = []
	if (Array.isArray(image)) {
		image.forEach(img => {
			console.log(img)
			backgroundImage.push(getSrc(img))
		})
	} else {
		backgroundImage.push(getSrc(image))
	}
	const backgroundColor = background ? background : styles.colors.gray
	console.log(backgroundImage)
	const Background = styled.div`
		${styledHeaderImage};
		background-color: ${backgroundColor};
		background-image: url(${backgroundImage[0]});
		background-position: ${coverPosition};
		@media (min-width: 800px) {
			background-image: url(${backgroundImage[1]});
		}
	`

	return (
		<Background>
			<h1 css={titleHeader}>
				{large && (
					<span
						css={css`
							font-size: 64pt;
						`}
					>
						{large}
					</span>
				)}
				{large && <br />}
				{title}
			</h1>
		</Background>
	)
}

export default HeaderImage
