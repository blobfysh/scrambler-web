import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import SEO from '../components/SEO'
import { Heading,
	Link,
	Box,
	Text,
	VStack,
	Spinner,
	Center,
	SimpleGrid } from '@chakra-ui/react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import queryString from 'query-string'

function WordBox ({ wordInfo }) {
	return (
		<VStack bg='gray.800' rounded='xl' p='6'>
			<Heading as='h3'>{wordInfo.word}</Heading>
			<Text>Approved: {wordInfo.approved ? 'Yes' : 'No'}</Text>
		</VStack>
	)
}

function Browse () {
	const [words, setWords] = useState(null)
	const location = useLocation()

	useEffect(() => {
		let mounted = true
		console.log(queryString.parse(location.search))

		async function fetchData () {
			try {
				const data = await fetch('/api/users/me/words')
				const result = await data.json()

				if (mounted) setWords(result)
			}
			catch (err) {
				console.log(err)
			}
		}

		fetchData()
		return () => {
			mounted = false
		}
	}, [location.search])

	return (
		<>
			<SEO />
			<Box>
				<Box textAlign='center' my='4' textStyle='paragraph'>
					<Heading as='h1'>Submitted Words</Heading>
					<Text>
						{
							words && !!words.length &&
							`${words.length} total words`
						}
					</Text>
				</Box>
				{
					words ?
						words.length ?
							<Box>
								<Heading my='3'>Approved</Heading>
								{
									!words.filter(wordInfo => wordInfo.approved).length &&
									<Text>No approved words!</Text>
								}
								<SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing='2'>
									{words.filter(wordInfo => wordInfo.approved).map(wordInfo => <WordBox key={wordInfo.word} wordInfo={wordInfo} />)}
								</SimpleGrid>
								<Heading my='3'>Unapproved</Heading>
								{
									!words.filter(wordInfo => !wordInfo.approved).length &&
									<Text>No unapproved words!</Text>
								}
								<SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing='2'>
									{words.filter(wordInfo => !wordInfo.approved).map(wordInfo => <WordBox key={wordInfo.word} wordInfo={wordInfo} />)}
								</SimpleGrid>
							</Box> :
							<Text>
								You haven&apos;t submitted any words.{' '}
								<Link
									as={RouterLink}
									to='/submit'
									color='blue.400'
								>
									Submit a new word
								</Link>
							</Text> :
						<Center>
							<Spinner />
						</Center>
				}
			</Box>
		</>
	)
}

WordBox.propTypes = {
	wordInfo: PropTypes.object
}

export default Browse
