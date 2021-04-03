import React from 'react'
import SEO from '../components/SEO'
import { Box,
	Heading,
	VStack,
	Text,
	Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import LoginForm from '../components/Login/LoginForm'

function Login () {
	return (
		<>
			<SEO
				title='Login'
			/>
			<VStack>
				<Box w={{ base: 'full', sm: 'fit-content' }}>
					<Box my='4' textStyle='paragraph'>
						<VStack textAlign='center'>
							<Heading>Sign in</Heading>
							<Text>No account?{' '}
								<Link
									as={RouterLink}
									to='/register'
									color='blue.400'
								>
									Register
								</Link>
							</Text>
						</VStack>
					</Box>
					<Box
						boxShadow='md'
						border='1px'
						borderColor='gray.600'
						p='3'
						rounded='lg'
					>
						<LoginForm />
					</Box>
				</Box>
			</VStack>
		</>
	)
}

export default Login
