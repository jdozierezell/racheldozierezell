const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const { data } = await graphql(`
        query {
            works: allDatoCmsWork {
                edges {
                    node {
                        slug
                    }
                }
            }
        }
    `)

    data.works.edges.forEach(({ node }) => {
        createPage({
            path: `work/${node.slug}`,
            component: path.resolve('./src/templates/work.js'),
            context: {
                slug: node.slug,
            },
        })
    })
}
