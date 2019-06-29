import React from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

const IndexPage = ({ data }) => {
    return (
        <Layout>
            <SEO title="Home" />
            {console.log(data.work.title)}
        </Layout>
    )
}

export const query = graphql`
    query {
        work: datoCmsWork {
            title
            descriptionNode {
                internal {
                    content
                }
            }
        }
    }
`

export default IndexPage
