import React from 'react'
import { css } from '@emotion/core'
import mq from '../helpers/media-queries'

const logoHide = css`
    fill: white;
    width: 50px;
    margin: 0.5rem;
    display: none;
    ${mq[1]} {
        display: block;
    }
`
const logoShow = css`
    display: block !important;
`
const Logo = props => {
    const { hide } = props
    return (
        <svg
            css={hide ? logoHide : [logoHide, logoShow]}
            version="1.1"
            id="rde_logo"
            viewBox="0 0 300 300"
        >
            <path
                d="M265.2,265.9l-94.64-161.64c12.64-5.15,22.07-11.83,28.29-20.04c6.22-8.21,9.34-18.34,9.34-30.39
	c0-17.46-6.83-30.8-20.48-40.01C174.06,4.61,155.17,0,131.04,0H6.58v33.53h29.96V79.7H9.64v37.36h26.56v145.18H9.64v37.36
	L192.72,300l-21.87-37.76H93.24V204.6h0.18l43.36-0.59l-22.3-37.07l-21.06,0.59l-0.18,0.01v-50.49l0.18,0.01l28.76,0.7l104.8,181.67
	h66.43V265.9H265.2z M93.42,33.53h25.76c9.16,0,16.4,1.88,21.71,5.63c5.3,3.76,7.96,9.39,7.96,16.9c0,15.54-11.54,23.31-34.59,23.31
	H93.42V33.53z"
            />
        </svg>
    )
}

export default Logo
