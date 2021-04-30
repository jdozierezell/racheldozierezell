require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
	siteMetadata: {
		title: `Rachel Dozier-Ezell`,
		description: `Rachel's website`,
		author: `@jdozierezell`,
	},
	flags: {
		FAST_DEV: true,
		DEV_SSR: true,
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-image`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		`gatsby-plugin-emotion`,
		`gatsby-plugin-playground`,
		`gatsby-plugin-transition-link`,
		{
			resolve: 'gatsby-plugin-html-attributes',
			options: {
				lang: 'en',
			},
		},
		{
			resolve: `gatsby-source-datocms`,
			options: {
				apiToken: process.env.DATOCMS_API,
				previewMode: true,
				disableLiveReload: false,
			},
		},
	],
}
