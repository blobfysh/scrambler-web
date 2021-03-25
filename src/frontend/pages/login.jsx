import React from 'react'
import SEO from '../components/SEO'
import Layout from '../components/Layout/Layout'
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
			<Layout centered>
				<Box w={{ base: 'full', sm: 'fit-content' }}>
					<Box my='4'>
						<VStack textAlign='center'>
							<Heading>Sign in</Heading>
							<Text>No account?{' '}
								<Link
									as={RouterLink}
									to='/register'
									color='blue.600'
								>
									Register
								</Link>
							</Text>
						</VStack>
					</Box>
					<Box
						boxShadow='md'
						border='1px'
						borderColor='gray.300'
						p='3'
						rounded='lg'
					>
						<LoginForm />
					</Box>
				</Box>
			</Layout>
		</>
	)
}

export default Login
