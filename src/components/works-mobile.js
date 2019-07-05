import React from 'react'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import Image from 'gatsby-image'
import styles from '../../theme'
import { css } from '@emotion/core'

const articleStyle = css`
    margin: 1rem auto;
    text-align: center;
`
const styledWorkImage = css`
    border: 4px solid ${styles.colors.pink};
    border-radius: 10%;
    margin: 0 25vw;
`
const heading1Style = css`
    background: ${styles.colors.pink};
    padding: 1rem;
    margin: 0 0 4rem 0;
    font-size: ${styles.fontSizes.heading};
    color: ${styles.colors.white};
    font-family: ${styles.fonts.rockwell};
    text-align: center;
`
const heading2Style = css`
    color: ${styles.colors.white};
    font-size: ${styles.fontSizes.heading};
    font-family: ${styles.fonts.rockwell};
    margin: 1rem 1rem 4rem 1rem;
`
const workStyle = css`
    text-decoration: none;
`
const WorksMobile = ({ works }) => {
    return (
        <>
            <h2 css={heading1Style}>Work</h2>
            {works.edges.map(({ node }) => {
                return (
                    <article css={articleStyle} key={node.id}>
                        <AniLink css={workStyle} fade to={`/work/${node.slug}`}>
                            <Image
                                css={styledWorkImage}
                                fluid={node.images[0].fluid}
                                backgroundColor={styles.colors.gray}
                            />
                            <h2 css={heading2Style}>{node.title}</h2>
                        </AniLink>
                    </article>
                )
            })}
        </>
    )
}

export default WorksMobile
