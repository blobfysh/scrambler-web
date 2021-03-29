import React from 'react'
import PropTypes from 'prop-types'
import { Container as ChakraContainer } from '@chakra-ui/react'

function Container ({ children, centered }) {
	return (
		<ChakraContainer
			maxW={{ base: 'full', sm: '2xl', md: '4xl' }}
			centerContent={centered}
		>
			{children}
		</ChakraContainer>
	)
}

Container.propTypes = {
	children: PropTypes.node,
	centered: PropTypes.bool
}

Container.defaultProps = {
	centered: false
}

export default Container
