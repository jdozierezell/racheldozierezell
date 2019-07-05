import React from 'react'
import Layout from '../components/layout'
import { useStaticQuery, graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import { css } from '@emotion/core'
import mq from '../helpers/media-queries'
import HeaderImage from '../components/header-image'
import styles from '../../theme'

const barStyle = css`
    height: 2rem;
    background: ${styles.colors.pink};
    ${mq[1]} {
        height: 4px;
    }
`
const articleStyle = css`
    margin: 3rem 2rem;
    line-height: 1.5;
    max-width: 800px;
    ${mq[1]} {
        margin: 3rem auto;
        position: relative;
        top: -10rem;
        background: ${styles.colors.black};
        padding: 0.01px 2rem; // small top added to wrap p margins
    }
`
const About = () => {
    const data = useStaticQuery(query)
    const { about } = data
    const { content, desktopImage, mobileImage, title, seoMetaTags } = about
    return (
        <Layout>
            <HelmetDatoCms seo={seoMetaTags} />
            <HeaderImage image={[mobileImage, desktopImage]} title={title} />
            <div css={barStyle} />
            <article css={articleStyle}>
                {content.map(block => {
                    return (
                        <div key={block.id}>
                            {block.model.apiKey === 'text' && (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: block.textNode.internal.content,
                                    }}
                                />
                            )}
                            {block.model.apiKey === 'image' && (
                                <div>{block.images.url}</div>
                            )}
                        </div>
                    )
                })}
            </article>
        </Layout>
    )
}

export const query = graphql`
    query {
        about: datoCmsAbout {
            title
            slug
            mobileImage: coverImage {
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
            desktopImage: coverImage {
                fluid(
                    maxWidth: 2160
                    imgixParams: {
                        w: "2160"
                        h: "1215"
                        fit: "crop"
                        crop: "edges"
                        q: 75
                    }
                ) {
                    ...GatsbyDatoCmsFluid_tracedSVG
                }
            }
            content {
                ... on DatoCmsText {
                    model {
                        apiKey
                    }
                    textNode {
                        internal {
                            content
                        }
                    }
                }
                ... on DatoCmsImage {
                    model {
                        apiKey
                    }
                    images {
                        url
                    }
                }
            }
            seoMetaTags {
                tags
            }
        }
    }
`

export default About
