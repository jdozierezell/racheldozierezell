import React from 'react'
// import { Link } from 'gatsby'
import { useStaticQuery, graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Image from 'gatsby-image'
import { css } from '@emotion/core'
import Layout from '../components/layout'
import styles from '../../theme'

const articleStyle = css`
    width: 33vh;
    margin: 1rem auto;
    text-align: center;
`
const styledWorkImage = css`
    border: 4px solid ${styles.colors.pink};
    border-radius: 50%;
`
const styledHomeImage = css`
    height: 100vh;
`
const heading1Style = css`
    background: ${styles.colors.pink};
    padding: 1rem;
    font-size: ${styles.fontSizes.heading};
    color: ${styles.colors.white};
    font-family: ${styles.fonts.rockwell};
    text-align: center;
`
const heading2Style = css`
    color: ${styles.colors.white};
    font-size: ${styles.fontSizes.heading};
    font-family: ${styles.fonts.rockwell};
`

const IndexPage = () => {
    const data = useStaticQuery(query)
    const { seo, home, works } = data
    const sources = [
        home.mobileImage.fluid,
        { ...home.desktopImage.fluid, media: `(min-width: 800px)` },
    ]
    return (
        <>
            <Layout home={true}>
                <HelmetDatoCms seo={seo.seoMetaTags} />
                <Image css={styledHomeImage} fluid={sources} />
                <h1 css={heading1Style}>Work</h1>
                {works.edges.map(({ node }) => {
                    return (
                        <article css={articleStyle}>
                            {console.log(node.images[0])}
                            <Image
                                css={styledWorkImage}
                                fluid={node.images[0].fluid}
                            />
                            <h2 css={heading2Style}>{node.title}</h2>
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
            desktopImage: coverImage {
                fluid(
                    maxWidth: 2160
                    imgixParams: {
                        w: "2160"
                        h: "1215"
                        fit: "crop"
                        crop: "faces"
                    }
                ) {
                    ...GatsbyDatoCmsFluid_tracedSVG
                }
            }
            mobileImage: coverImage {
                fluid(
                    maxWidth: 2160
                    imgixParams: {
                        dpr: 3
                        w: "2160"
                        h: "1000"
                        fit: "crop"
                        crop: "faces"
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
