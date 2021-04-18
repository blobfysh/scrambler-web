import React from 'react'
import { Box, Flex, Text, Link } from '@chakra-ui/react'

function Footer () {
	return (
		<Box
			as='footer'
			mt='auto'
		>
			<Flex
				mt='4'
				bg='gray.800'
				p='3'
				direction='column'
				align='center'
			>
				<Text>Created by blobfysh</Text>
				<Link href='https://github.com/blobfysh/scrambler-web' isExternal>GitHub</Link>
			</Flex>
		</Box>
	)
}

export default Footer
