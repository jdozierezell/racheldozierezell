import React, { Component } from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'
import styles from '../../theme'
import mq from '../helpers/media-queries'

const pageList = css`
    position: fixed;
    top: 225px;
    left: 20vw;
    ${mq[1]} {
        display: flex;
    }
    max-width: 960px;
    list-style: none;
    margin: 2rem 0;
    padding: 0;
    gap: 4rem;
    justify-content: flex-start;
    transition: left 200ms ease-out;
`
const pageListActive = css`
    position: initial;
`
const pageListItem = css`
    font-size: 32px;
    color: white;
    font-family: rockwell-nova, sans-serif;
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
        navText: `Much`,
        navLink: `/about`,
    },
    {
        navText: `Harder`,
        navLink: `/contact`,
    },
]

class HeaderNavigation extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        active: this.props.active,
        css: pageList,
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ active: nextProps.active })
    }
    render() {
        return (
            <ul css={this.state.css}>
                {navLinks.map(item => {
                    return (
                        <li css={pageListItem}>
                            <Link css={navLink} to={item.navLink}>
                                {item.navText}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

export default HeaderNavigation
