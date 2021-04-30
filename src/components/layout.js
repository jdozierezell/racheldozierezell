/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'

import Header from './header'
import Footer from './footer'
import './layout.css'
import 'normalize.css'

const Layout = ({ children, home }) => {
	return (
		<>
			<Header home={home} />
			<main
				style={{
					position: 'relative',
				}}
			>
				{children}
			</main>
			<Footer />
		</>
	)
}

export default Layout
