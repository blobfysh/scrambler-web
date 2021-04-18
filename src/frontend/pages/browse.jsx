import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import SEO from '../components/SEO'
import { Heading,
	Box,
	Text,
	VStack,
	Spinner,
	Center,
	SimpleGrid,
	InputGroup,
	InputRightElement,
	Input,
	Fade,
	Alert,
	AlertIcon,
	Flex,
	Button } from '@chakra-ui/react'
import { HiSearch } from 'react-icons/hi'
import { useLocation, useHistory } from 'react-router-dom'
import queryString from 'query-string'

function WordBox ({ wordInfo, index }) {
	const [fadedIn, setFadedIn] = useState(false)

	useEffect(() => {
		const timeout = setTimeout(() => {
			setFadedIn(true)
		}, 100 * index)

		return () => {
			// clear timeout to prevent state update on unmounted component
			clearTimeout(timeout)
		}
	}, [index])

	return (
		<Fade in={fadedIn}>
			<VStack bg='gray.800' rounded='xl' p='6'>
				<Heading as='h3'>{wordInfo.word}</Heading>
				<Text>Created: {new Date(wordInfo.createdAt).toLocaleDateString()}</Text>
			</VStack>
		</Fade>
	)
}

function SearchBarForm ({ onSubmit, onChange, value }) {
	return (
		<form onSubmit={onSubmit}>
			<InputGroup>
				<InputRightElement
					zIndex='0'
					pointerEvents='none'
				>
					<HiSearch size='1.4em' />
				</InputRightElement>
				<Input variant='filled' type='text' placeholder='Search words' onChange={onChange} value={value} />
			</InputGroup>
		</form>
	)
}

function WordResults ({ wordsResult, onNext, onPrevious, buttonsDisabled }) {
	return (
		<>
			<SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing='2'>
				{wordsResult.words.map((wordInfo, index) => <WordBox key={wordInfo.word} wordInfo={wordInfo} index={index} />)}
			</SimpleGrid>
			<Flex
				direction='row'
				wrap='nowrap'
				justify='space-between'
				mt='4'
			>
				<Button disabled={!wordsResult.previous || buttonsDisabled} onClick={onPrevious}>Previous</Button>
				<Button disabled={!wordsResult.next || buttonsDisabled} onClick={onNext}>Next</Button>
			</Flex>
		</>
	)
}

function Browse () {
	const [wordsResult, setWordsResult] = useState(null)
	const [searchInput, setSearchInput] = useState('')
	const [buttonsDisabled, setButtonsDisabled] = useState(false)
	const [errorState, setError] = useState(null)
	const location = useLocation()
	const history = useHistory()

	useEffect(() => {
		let mounted = true

		// parsing then using stringify to remove null/empty query values (ex. /api/words?word= )
		const parsedQuery = queryString.parse(location.search)

		async function fetchData () {
			try {
				const data = await fetch(`/api/words?${queryString.stringify(parsedQuery, { skipNull: true, skipEmptyString: true })}`)
				const result = await data.json()

				if (mounted) {
					if (data.status !== 200) {
						setWordsResult(null)
						setError('There was an error performing your search, try again?')
					}
					else {
						setButtonsDisabled(false)
						setError(null)
						setWordsResult(result)
					}
				}
			}
			catch (err) {
				setWordsResult(null)
				setError('There was an error performing your search, try again?')
				console.log(err)
			}
		}

		fetchData()
		return () => {
			mounted = false
		}
	}, [location.search])

	const handleInputChange = e => {
		setSearchInput(e.target.value)
	}

	const handleSubmit = async e => {
		e.preventDefault()

		history.push({
			search: `?word=${searchInput}`
		})
	}

	const handleNext = () => {
		// disabling the buttons after click prevents multiple clicks from being registered,
		// done to prevent showing error when page number is too high for the amount of results
		setButtonsDisabled(true)

		const parsedQuery = queryString.parse(location.search)
		const query = {
			page: parseInt(parsedQuery.page) + 1 || 2,
			word: parsedQuery.word || ''
		}

		history.push({
			search: `?${queryString.stringify(query, { skipNull: true, skipEmptyString: true })}`
		})
	}

	const handlePrevious = () => {
		setButtonsDisabled(true)

		const parsedQuery = queryString.parse(location.search)
		const query = {
			page: parseInt(parsedQuery.page) - 1,
			word: parsedQuery.word || ''
		}

		history.push({
			search: `?${queryString.stringify(query, { skipNull: true, skipEmptyString: true })}`
		})
	}

	return (
		<>
			<SEO
				title='Browse Words'
			/>
			<Box>
				<Box textAlign='center' my='4' textStyle='paragraph'>
					<Heading as='h1' mb='2'>Browse Words</Heading>
					<Box mx='auto' w={{ base: '100%', md: '33%' }}>
						<SearchBarForm
							onChange={handleInputChange}
							onSubmit={handleSubmit}
							value={searchInput}
						/>
					</Box>
				</Box>
				{
					!wordsResult && !errorState &&
					<Center>
						<Spinner />
					</Center>
				}
				{
					wordsResult &&
					(
						wordsResult.words.length ?
							<WordResults
								wordsResult={wordsResult}
								onNext={handleNext}
								onPrevious={handlePrevious}
								buttonsDisabled={buttonsDisabled}
							/> :
							<Text>No words found</Text>
					)
				}
				{
					errorState &&
					<Alert status='error' rounded='md'>
						<AlertIcon />
						{errorState}
					</Alert>
				}
			</Box>
		</>
	)
}

SearchBarForm.propTypes = {
	onSubmit: PropTypes.func,
	onChange: PropTypes.func,
	value: PropTypes.string
}

WordBox.propTypes = {
	wordInfo: PropTypes.object,
	index: PropTypes.number
}

WordResults.propTypes = {
	wordsResult: PropTypes.object,
	onNext: PropTypes.func,
	onPrevious: PropTypes.func,
	buttonsDisabled: PropTypes.bool
}

export default Browse
