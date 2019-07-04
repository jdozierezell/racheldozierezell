import React from 'react'
import { graphql } from 'gatsby'
import { Global, css } from '@emotion/core'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Slider from 'react-slick'
import Image from 'gatsby-image'
import 'react-image-lightbox/style.css'
import Layout from '../components/layout'
import HeaderImage from '../components/header-image'
import styles from '../../theme'

const barStyle = css`
    height: 2rem;
    background: ${styles.colors.pink};
`
const articleStyle = css`
    margin: 3rem 2rem;
    line-height: 1.5;
`
const Work = ({ data }) => {
    const { title, description, images, seo } = data.work
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        easing: 'ease-in-out',
        swipeToSlide: true,
        lazyLoad: true,
    }
    return (
        <Layout
            css={css`
                color: white;
            `}
        >
            <Global
                styles={css`
                    .slick-track {
                        display: flex;
                        align-items: center;
                    }
                `}
            />
            <HelmetDatoCms seo={seo} />
            <HeaderImage image={images[0].fluid} title={title} />
            <div css={barStyle} />
            <article css={articleStyle}>
                <h2>About {title}</h2>
                <div dangerouslySetInnerHTML={{ __html: description }} />
                <Slider {...settings}>
                    {images.map((image, index) => {
                        return (
                            <div key={index}>
                                <Image
                                    fluid={image.fluid}
                                    backgroundColor={styles.colors.gray}
                                />
                            </div>
                        )
                    })}
                </Slider>
            </article>
        </Layout>
    )
}

export const query = graphql`
    query getWork($slug: String!) {
        work: datoCmsWork(slug: { eq: $slug }) {
            seo: seoMetaTags {
                tags
            }
            title
            slug
            description
            images {
                fluid(maxWidth: 2160) {
                    ...GatsbyDatoCmsFluid_tracedSVG
                }
            }
        }
    }
`

export default Work
