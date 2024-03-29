import React from 'react'
import SEO from '../components/SEO'
import { Box,
	Heading,
	VStack,
	Text,
	Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import RegisterForm from '../components/Register/RegisterForm'

function Register () {
	return (
		<>
			<SEO
				title='Register'
			/>
			<VStack>
				<Box w={{ base: 'full', sm: 'fit-content' }}>
					<Box my='4' textStyle='paragraph'>
						<VStack textAlign='center'>
							<Heading>Create an account</Heading>
							<Text>Already have an account?{' '}
								<Link
									as={RouterLink}
									to='/login'
									color='blue.400'
								>
									Login
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
						<RegisterForm />
					</Box>
				</Box>
			</VStack>
		</>
	)
}

export default Register
