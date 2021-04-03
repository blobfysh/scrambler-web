import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Container from '../Container'

function Layout ({ children }) {
	return (
		<>
			<Header />
			<Container>{children}</Container>
		</>
	)
}

Layout.propTypes = {
	children: PropTypes.node
}

export default Layout
