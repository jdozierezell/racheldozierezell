import React, { Component } from 'react'
import { css } from '@emotion/react'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import styles from '../../theme'
import mq from '../helpers/media-queries'

const pageList = css`
	position: fixed;
	max-width: 960px;
	list-style: none;
	padding: 36% 0 0 18%;
	justify-content: flex-start;
	transition: left 150ms ease-out, right 150ms ease-out;
	z-index: 0;
	background: ${styles.colors.pink60};
	margin: 0;
	${mq[1]} {
		display: flex;
		padding: 0%;
		position: initial;
		background: transparent;
		border: none;
	}
`
const pageListInactive = css`
	left: 100vw;
	top: 0;
	right: -100vw;
	bottom: 0;
`
const pageListActive = css`
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
`
const pageListItem = css`
	font-size: ${styles.fontSizes.text};
	color: white;
	margin: 0 4rem 3rem 0;
	font-family: ${styles.fonts.rockwell};
	${mq[1]} {
		margin-bottom: initial;
		padding: 1rem 0;
	}
`
const navLink = css`
	color: white;
	text-decoration: none;
`
const navLinks = [
	{
		navText: `Work`,
		navLink: `/`,
	},
	{
		navText: `About`,
		navLink: `/about`,
	},
	{
		navText: `Contact`,
		navLink: `/contact`,
	},
	{
		navText: `EyeCraftYouCraft`,
		navLink: `https://eyecraftyoucraft.com`,
	},
]

class HeaderNavigation extends Component {
	state = {
		active: this.props.active,
	}
	componentWillReceiveProps(nextProps) {
		this.setState({ active: nextProps.active })
		this.setState({ css: nextProps.active ? 'pageLinkActive' : '' })
	}
	render() {
		const pageListStyle = this.state.active
			? [pageList, pageListActive]
			: [pageList, pageListInactive]
		return (
			<ul css={pageListStyle}>
				{navLinks.map((item, index) => {
					return (
						<li css={pageListItem} key={index}>
							{item.navLink.indexOf('https://') === -1 && (
								<AniLink fade css={navLink} to={item.navLink}>
									{item.navText}
								</AniLink>
							)}
							{item.navLink.indexOf('https://') === 0 && (
								<a css={navLink} href={item.navLink}>
									{item.navText}
								</a>
							)}
						</li>
					)
				})}
			</ul>
		)
	}
}

export default HeaderNavigation
