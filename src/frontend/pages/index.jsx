import React, { useEffect, useState } from 'react'
import SEO from '../components/SEO'
import { Heading, Text, chakra, Button, VStack, HStack } from '@chakra-ui/react'
import { HiArrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import CountUp from 'react-countup'

function Home () {
	const [wordsData, setData] = useState(null)

	useEffect(() => {
		let mounted = true

		async function fetchData () {
			try {
				const data = await fetch('/api/stats')
				const result = await data.json()

				if (mounted) {
					setData(result)
				}
			}
			catch (err) {
				console.log(err)
			}
		}

		fetchData()
		return () => {
			// needed to prevent state updates on unmounted components: https://codesandbox.io/s/jvvkoo8pq3
			mounted = false
		}
	}, [])

	return (
		<>
			<SEO />
			<VStack py='24' textAlign='center' spacing='10' textStyle='paragraph'>
				<VStack spacing='10'>
					<Heading textStyle='h1' as='h1'>User-submitted scramble words with hints and definitions</Heading>
					<Text fontSize='xl'>
						{
							wordsData ?
								<CountUp end={wordsData.approved} /> :
								'0'
						}
						{' '}<chakra.span color='green.300'>approved</chakra.span> scramble words and{' '}
						{
							wordsData ?
								<CountUp end={wordsData.unapproved} /> :
								'0'
						}
						{' '}<chakra.span color='red.300'>unapproved</chakra.span>.
					</Text>
				</VStack>
				<HStack>
					<Button
						colorScheme='blue'
						size='lg'
						rightIcon={<HiArrowRight />}
						as={Link}
						to='/submit'
					>
						Submit a word
					</Button>
					<Button
						colorScheme='blue'
						variant='ghost'
						size='lg'
						as={Link}
						to='/login'
						_hover={{ bg: 'gray.600' }}
						_active={{
							bg: 'gray.600'
						}}
						textColor='gray.50'
					>
						API
					</Button>
				</HStack>
			</VStack>
		</>
	)
}

export default Home
