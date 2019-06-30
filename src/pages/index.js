import React from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import Layout from '../components/layout'

const IndexPage = ({ data }) => {
    return (
        <Layout>
            <HelmetDatoCms seo={data.seo.seoMetaTags} />
            {data.works.edges.map(({ node }) => {
                return (
                    <article>
                        <Img fluid={node.images[0].fluid} />
                        <h2>{node.title}</h2>
                    </article>
                )
            })}
        </Layout>
    )
}

export const query = graphql`
    query {
        seo: datoCmsHome(title: { eq: "Home" }) {
            title
            seoMetaTags {
                ...GatsbyDatoCmsSeoMetaTags
            }
        }
        works: allDatoCmsWork {
            edges {
                node {
                    id: originalId
                    title
                    slug
                    images {
                        fluid(maxWidth: 500, maxHeight: 500) {
                            ...GatsbyDatoCmsFluid_tracedSVG
                        }
                    }
                }
            }
        }
    }
`

export default IndexPage
