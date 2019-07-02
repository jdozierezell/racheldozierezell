// import { Link } from 'gatsby'
// import PropTypes from 'prop-types'
import React from 'react'
import styled from '@emotion/styled'
// import { css } from '@emotion/core'
import styles from '../../theme'
import mq from '../helpers/media-queries'

const PageFooter = styled.footer`
    color: ${styles.colors.white};
    height: 104px;
    background: ${styles.colors.pink};
    font-size: 1rem;
    font-family: rockwell-nova, sans-serif;
    display: grid;
    align-content: center;
    justify-content: center;
    padding-right: 1rem;
    ${mq[1]} {
        justify-content: flex-end;
    }
`

const Footer = () => (
    <PageFooter>© {new Date().getFullYear()}, Rachel Dozier-Ezell</PageFooter>
)

export default Footer
