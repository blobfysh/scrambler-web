import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import SEO from '../../components/SEO'
import { Heading,
	Link,
	Box,
	Text,
	VStack,
	Spinner,
	Center,
	Flex } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

function WordBox ({ wordInfo }) {
	return (
		<VStack bg='gray.800' rounded='xl' p='6' m='2'>
			<Heading as='h3'>{wordInfo.word}</Heading>
			<Text>Approved: {wordInfo.approved ? 'Yes' : 'No'}</Text>
		</VStack>
	)
}

function Words () {
	const [words, setWords] = useState(null)

	useEffect(() => {
		async function fetchData () {
			try {
				const data = await fetch('/api/users/me/words')
				const result = await data.json()

				setWords(result)
			}
			catch (err) {
				console.log(err)
			}
		}

		fetchData()
	}, [])

	return (
		<>
			<SEO />
			<VStack>
				<Box w={{ base: 'full', sm: 'fit-content' }} my='4' textStyle='paragraph'>
					<Heading textAlign='center'>Submitted Words</Heading>
				</Box>
				{
					words ?
						words.length ?
							<Flex direction='row' wrap='wrap' justify='center'>
								{words.map(wordInfo => <WordBox key={wordInfo.word} wordInfo={wordInfo} />)}
							</Flex> :
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
			</VStack>
		</>
	)
}

WordBox.propTypes = {
	wordInfo: PropTypes.object
}

export default Words
