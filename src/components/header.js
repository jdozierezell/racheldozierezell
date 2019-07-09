// import { Link } from 'gatsby'
// import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import styles from '../../theme'
import mq from '../helpers/media-queries'
import MenuButton from './menu-button'
import HeaderNavigation from './header-navigation'
import Logo from './logo'

const SiteHeader = styled.header`
    display: grid;
    position: absolute;
    grid-template-columns: 150px 1fr;
    z-index: 1;
    ${mq[1]} {
        height: 70px;
        display: grid;
        position: relative;
    }
`
const navWrapper = css`
    margin: 0;
    overflow: auto;
`

class Header extends Component {
    constructor(props) {
        super(props)
        this.handleMenuButton = this.handleMenuButton.bind(this)
        this.state = {
            active: false,
        }
    }
    handleMenuButton() {
        this.setState({ active: !this.state.active })
    }
    render() {
        const background =
            this.props.home === true ? 'transparent' : styles.colors.pink
        return (
            <SiteHeader
                css={css`
                    background: ${background};
                    ${mq[1]} {
                        background: ${styles.colors.pink};
                    }
                `}
            >
                <Logo hide={true} />
                <nav css={navWrapper}>
                    <MenuButton
                        active={this.state.active}
                        onButtonClick={this.handleMenuButton}
                    />
                    <HeaderNavigation active={this.state.active} />
                </nav>
            </SiteHeader>
        )
    }
}

export default Header
