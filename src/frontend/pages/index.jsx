import React from 'react'
import SEO from '../components/SEO'
import Layout from '../components/Layout/Layout'
import { Heading, Box, Text, chakra, Button, VStack, Divider, HStack } from '@chakra-ui/react'
import { HiArrowRight } from 'react-icons/hi'
import Container from '../components/Container'
import { Link } from 'react-router-dom'

function Home () {
	return (
		<>
			<SEO />
			<Layout>
				<VStack py='24' textAlign='center' spacing='10' bg='gray.700' color='gray.50'>
					<Container>
						<VStack spacing='10'>
							<Heading color='white' fontSize={{ base: '3xl', sm: '3xl', md: '4xl', lg: '5xl' }}>User-submitted scramble words with hints and definitions</Heading>
							<Text fontSize='xl'>
								1,000 <chakra.span color='green.300'>approved</chakra.span> scramble words and 4,000 <chakra.span color='red.300'>unapproved</chakra.span>.
							</Text>
						</VStack>
					</Container>
					<HStack>
						<Button
							colorScheme='blue'
							size='lg'
							rightIcon={<HiArrowRight />}
							as={Link}
							to='/login'
						>
							Submit a word
						</Button>
						<Button
							colorScheme='blue'
							variant='ghost'
							size='lg'
							as={Link}
							to='/login'
						>
							API
						</Button>
					</HStack>

				</VStack>
			</Layout>
		</>
	)
}

export default Home
