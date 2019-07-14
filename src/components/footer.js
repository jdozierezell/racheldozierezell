import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import styles from '../../theme'
import Logo from './logo'

const PageFooter = styled.footer`
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
    <PageFooter>
        <Logo hide={false} />
        <small
            css={css`
                font-size: 1rem;
            `}
        >
            © {new Date().getFullYear()}, Rachel Dozier-Ezell
        </small>
    </PageFooter>
)

export default Footer
