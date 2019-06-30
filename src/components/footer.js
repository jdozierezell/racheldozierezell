import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import styles from '../../theme'

const PageFooter = styled.footer`
    color: ${styles.colors.white};
    height: 104px;
    background: ${styles.colors.pink};
    font-size: 1rem;
    font-family: rockwell-nova, sans-serif;
    display: grid;
    align-content: center;
    justify-content: flex-end;
    padding-right: 1rem;
`

const Footer = () => (
    <PageFooter>© {new Date().getFullYear()}, Rachel Dozier-Ezell</PageFooter>
)

export default Footer
