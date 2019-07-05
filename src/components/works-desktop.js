import React from 'react'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import Image from 'gatsby-image'
import Slider from 'react-slick'
import styles from '../../theme'
import { css } from '@emotion/core'
import mq from '../helpers/media-queries'

const articleStyle = css`
    margin: 1rem auto;
    text-align: center;
`
const styledWorkImage = css`
    border: 4px solid ${styles.colors.pink};
    border-radius: 10%;
    margin: 0 25vw;
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
const barStyle = css`
    height: 2rem;
    background: ${styles.colors.pink};
    ${mq[1]} {
        height: 4px;
    }
`
const sliderStyle = css`
    margin: 3rem 2rem;
`
const WorksDesktop = ({ works }) => {
    const settings = {
        dots: true,
        infinite: true,
        easing: 'ease-in-out',
        // swipeToSlide: true,
        lazyLoad: true,
    }
    return (
        <>
            <div css={barStyle} />
            <Slider css={sliderStyle} {...settings}>
                {works.edges.map(({ node }) => {
                    return (
                        <article key={node.id}>
                            <AniLink
                                css={workStyle}
                                fade
                                to={`/work/${node.slug}`}
                            >
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
            </Slider>
        </>
    )
}

export default WorksDesktop
