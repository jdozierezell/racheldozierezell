import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Image from 'gatsby-image'
import { css } from '@emotion/core'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import Layout from '../components/layout'
import HeaderImage from '../components/header-image'
import styles from '../../theme'
import mq from '../helpers/media-queries'

const sectionStyle = css`
    display: flex;
    flex-flow: row wrap;
    margin: 3rem 2rem;
`
const articleStyle = css`
    text-align: center;
    max-width: 400px;
    margin: 1rem auto 4rem auto;
    position: relative;
`
const styledWorkImage = css`
    display: block;
    border: 4px solid ${styles.colors.pink};
    width: 70vw;
    max-width: 400px;
    margin: 0 auto;
`
const heading2Style = css`
    color: ${styles.colors.white};
    font-size: ${styles.fontSizes.text};
    position: absolute;
    top: 40%;
    filter: drop-shadow(5px 5px 5px ${styles.colors.black});
    width: 100%;
    padding: 0 2rem;
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
                <div css={barStyle} />
                <section css={sectionStyle}>
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
                                        fluid={node.thumb.fluid}
                                        backgroundColor={styles.colors.gray}
                                    />
                                    <h2 css={heading2Style}>{node.title}</h2>
                                </AniLink>
                            </article>
                        )
                    })}
                </section>
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
                        w: "1590"
                        h: "736"
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
                        w: "2400"
                        h: "1080"
                        fit: "crop"
                        crop: "faces"
                        q: 75
                    }
                ) {
                    ...GatsbyDatoCmsFluid_tracedSVG
                }
            }
        }
        works: allDatoCmsWork(sort: { fields: order, order: DESC }) {
            edges {
                node {
                    id: originalId
                    title
                    slug
                    thumb: coverImage {
                        fluid(
                            maxWidth: 500
                            imgixParams: {
                                w: "500"
                                h: "310"
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
        }
    }
`

export default IndexPage
