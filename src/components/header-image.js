import React from 'react'
import BackgroundImage from 'gatsby-background-image'
import { css } from '@emotion/core'
import styles from '../../theme'

const styledHeaderImage = css`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
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
    const { image, large, title, background } = props
    const sources = [
        image[0].fluid,
        { ...image[1].fluid, media: `(min-width: 800px)` },
    ]
    return (
        <BackgroundImage
            css={styledHeaderImage}
            fluid={sources}
            backgroundColor={background}
        >
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
        </BackgroundImage>
    )
}

export default HeaderImage
