import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import { Container } from '@chakra-ui/react'

function Layout ({ children }) {
	return (
		<>
			<Header />
			<Container
				centerContent={true}
			>
				{children}
			</Container>
		</>
	)
}

Layout.propTypes = {
	children: PropTypes.node
}

export default Layout
