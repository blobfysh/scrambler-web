import React from 'react'
import Layout from '../../components/Layout/Layout'
import { Heading,
	Button,
	VStack,
	HStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function Words () {
	return (
		<>
			<Layout>
				<VStack py='24' textAlign='center' spacing='10' textStyle='paragraph'>
					<Heading>Submitted Words</Heading>
					<HStack>
						<Button
							colorScheme='blue'
							size='lg'
							as={Link}
							to='/'
						>
							HEY
						</Button>
					</HStack>
				</VStack>
			</Layout>
		</>
	)
}

export default Words
