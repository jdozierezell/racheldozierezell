import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/core'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Slider from 'react-slick'
import Layout from '../components/layout'
import HeaderImage from '../components/header-image'
import Image from 'gatsby-image'
import styles from '../../theme'

const barStyle = css`
    height: 2rem;
    background: ${styles.colors.pink};
`
const articleStyle = css`
    margin: 3rem 2rem;
    line-height: 1.5;
`
const MyComponent = () => {
    const { work } = useStaticQuery(query)
    const { title, description, images, seo } = work
    const settings = { dots: true }
    return (
        <Layout
            css={css`
                color: white;
            `}
        >
            <HelmetDatoCms seo={seo} />
            <HeaderImage image={images[0].fluid} title={title} />
            <div css={barStyle} />
            <article css={articleStyle}>
                <h2>About {title}</h2>
                <div dangerouslySetInnerHTML={{ __html: description }} />
                <Slider {...settings}>
                    {images.map((image, index) => {
                        return (
                            <div>
                                <Image fluid={image.fluid} />
                            </div>
                        )
                    })}
                    <div>
                        <h3>1</h3>
                    </div>
                </Slider>
            </article>
        </Layout>
    )
}

const query = graphql`
    query {
        work: datoCmsWork {
            seo: seoMetaTags {
                tags
            }
            title
            slug
            description
            images {
                fluid(
                    maxWidth: 2160
                    imgixParams: {
                        w: "2160"
                        h: "1000"
                        fit: "crop"
                        crop: "faces"
                        q: 75
                    }
                ) {
                    ...GatsbyDatoCmsFluid_tracedSVG
                }
            }
        }
    }
`

export default MyComponent
