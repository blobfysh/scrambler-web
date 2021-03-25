import React from 'react'
import PropTypes from 'prop-types'
import { Container as ChakraContainer } from '@chakra-ui/react'

function Container ({ children }) {
	return (
		<ChakraContainer
			maxW={{ base: 'full', sm: '2xl', md: '4xl' }}
			centerContent={true}
		>
			{children}
		</ChakraContainer>
	)
}

Container.propTypes = {
	children: PropTypes.node
}

export default Container
