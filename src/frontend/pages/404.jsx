import React from 'react'
import SEO from '../components/SEO'
import { Heading, Button, VStack, HStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function NotFound () {
	return (
		<>
			<SEO
				title='Page not found'
			/>
			<VStack py='24' textAlign='center' spacing='10' textStyle='paragraph'>
				<Heading textStyle='h1' as='h1'>There&apos;s no page here!</Heading>
				<HStack>
					<Button
						colorScheme='blue'
						size='lg'
						as={Link}
						to='/'
					>
						Return home
					</Button>
				</HStack>
			</VStack>
		</>
	)
}

export default NotFound
