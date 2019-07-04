import React, { Component } from 'react'
import { css } from '@emotion/core'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import styles from '../../theme'
import mq from '../helpers/media-queries'

const pageList = css`
    position: fixed;
    max-width: 960px;
    list-style: none;
    padding: 36% 0% 0% 18%;
    gap: 4rem;
    justify-content: flex-start;
    transition: left 150ms ease-out, right 150ms ease-out;
    z-index: 0;
    background: ${styles.colors.pink60};
    border: 4px solid ${styles.colors.pink};
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
    top: -1.25rem;
    right: -100vw;
    bottom: 40vw;
`
const pageListActive = css`
    left: 18vw;
    top: -1.25rem;
    right: -4px;
    bottom: 40vw;
    background: ${styles.colors.pink60};
    border: 4px solid ${styles.colors.pink};
`
const pageListItem = css`
    font-size: 32px;
    color: white;
    margin-bottom: 3rem;
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
                            <AniLink fade css={navLink} to={item.navLink}>
                                {item.navText}
                            </AniLink>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

export default HeaderNavigation
