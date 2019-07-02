import React, { Component } from 'react'
import { css } from '@emotion/core'
// import facepaint from 'facepaint'
// import styles from '../../theme'
import mq from '../helpers/media-queries'

const buttonStyle = css`
    position: fixed;
    right: 1rem;
    top: 1rem;
    z-index: 1;
    ${mq[1]} {
        display: none;
    }
`

class MenuButton extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        const { onButtonClick } = this.props
        this.state.active
            ? this.setState({
                  active: false,
                  css: 'hamburger hamburger--emphatic',
              })
            : this.setState({
                  active: true,
                  css: 'hamburger hamburger--emphatic is-active',
              })
        onButtonClick()
    }
    state = {
        active: this.props.active,
        css: 'hamburger hamburger--emphatic',
    }
    render() {
        return (
            <button
                css={buttonStyle}
                className={this.state.css}
                type="button"
                onClick={this.handleClick}
            >
                <span className="hamburger-box">
                    <span className="hamburger-inner" />
                </span>
            </button>
        )
    }
}

export default MenuButton
