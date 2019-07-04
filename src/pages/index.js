import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Image from 'gatsby-image'
import { css } from '@emotion/core'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import Layout from '../components/layout'
import HeaderImage from '../components/header-image'
import styles from '../../theme'

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
const IndexPage = () => {
    const data = useStaticQuery(query)
    const { seo, home, works } = data
    return (
        <>
            <Layout home={true}>
                <HelmetDatoCms seo={seo.seoMetaTags} />
                <HeaderImage
                    image={[home.mobileImage, home.desktopImage]}
                    large="Rachel"
                    title="Dozier-Ezell"
                />
                <h2 css={heading1Style}>Work</h2>
                {works.edges.map(({ node }) => {
                    return (
                        <article css={articleStyle} key={node.id}>
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
            </Layout>
        </>
    )
}

const query = graphql`
    query {
        seo: datoCmsHome(title: { eq: "Home" }) {
            title
            seoMetaTags {
                ...GatsbyDatoCmsSeoMetaTags
            }
        }
        home: datoCmsHome {
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
        }
        works: allDatoCmsWork {
            edges {
                node {
                    id: originalId
                    title
                    slug
                    images {
                        fluid(
                            imgixParams: {
                                w: "500"
                                h: "500"
                                fit: "crop"
                                crop: "faces"
                            }
                        ) {
                            ...GatsbyDatoCmsFluid_tracedSVG
                        }
                    }
                }
            }
        }
    }
`

export default IndexPage
