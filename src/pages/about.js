import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Image from 'gatsby-image'

const About = ({ data }) => {
    const { about } = data
    const { content, coverImage, title, seoMetaTags } = about
    return (
        <Layout>
            <HelmetDatoCms seo={seoMetaTags} />
            <Image fluid={coverImage.fluid} />
            <h1>{title}</h1>
            <article>
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
            coverImage {
                fluid {
                    src
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
