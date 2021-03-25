import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Container from '../Container'

function Layout ({ children, centered }) {
	return (
		<>
			<Header />
			{
				centered ?
					<Container>{children}</Container> :
					children
			}
		</>
	)
}

Layout.propTypes = {
	children: PropTypes.node,
	centered: PropTypes.bool
}

export default Layout
