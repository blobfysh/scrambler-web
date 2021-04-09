import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import SEO from '../components/SEO'
import { Heading,
	Box,
	Text,
	VStack,
	Spinner,
	Center,
	Flex,
	Button,
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogCloseButton,
	AlertDialogFooter,
	ButtonGroup,
	useDisclosure,
	Alert,
	AlertIcon } from '@chakra-ui/react'

function WordRow ({ wordInfo }) {
	const { isOpen: approveIsOpen, onOpen: approveOnOpen, onClose: approveOnClose } = useDisclosure()
	const { isOpen: declineIsOpen, onOpen: declineOnOpen, onClose: declineOnClose } = useDisclosure()
	const approveCancelRef = useRef()
	const declineCancelRef = useRef()
	const [errorState, setError] = useState(false)

	const handleApprove = async () => {
		try {
			const data = await fetch(`/api/words/${wordInfo.word}`, {
				method: 'PATCH',
				body: JSON.stringify({ approved: true }),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if (data.status !== 200) {
				setError(true)
				approveOnClose()
			}
			else {
				window.location.reload()
			}
		}
		catch (err) {
			setError(true)
			approveOnClose()
		}
	}

	const handleDecline = async () => {
		try {
			const data = await fetch(`/api/words/${wordInfo.word}`, {
				method: 'DELETE'
			})

			if (data.status !== 200) {
				setError(true)
				declineOnClose()
			}
			else {
				window.location.reload()
			}
		}
		catch (err) {
			setError(true)
			declineOnClose()
		}
	}

	return (
		<Box bg='gray.800' rounded='xl' p='6' m='2' w='100%'>
			{
				errorState &&
				<Alert status='error' rounded='sm' mb='3'>
					<AlertIcon />
					There was an error processing your request with this word, try again later.
				</Alert>
			}
			<Heading as='h3'>{wordInfo.word}</Heading>
			<Text>Difficulty: {wordInfo.difficulty}</Text>
			<Text>Definition: {wordInfo.definition}</Text>
			<Text>Rhymes with: {wordInfo.rhymesWith.join(', ')}</Text>
			<Text>Created on {new Date(wordInfo.createdAt).toLocaleString()} by {wordInfo.createdBy.name}</Text>
			<ButtonGroup mt='3'>
				<Button colorScheme='green' onClick={approveOnOpen}>Approve</Button>
				<Button colorScheme='red' onClick={declineOnOpen}>Decline</Button>
			</ButtonGroup>
			<AlertDialog
				leastDestructiveRef={approveCancelRef}
				onClose={approveOnClose}
				isOpen={approveIsOpen}
				isCentered
			>
				<AlertDialogOverlay />
				<AlertDialogContent>
					<AlertDialogHeader>Approve {wordInfo.word}?</AlertDialogHeader>
					<AlertDialogCloseButton />
					<AlertDialogFooter>
						<Button ref={approveCancelRef} onClick={approveOnClose}>
							No
						</Button>
						<Button colorScheme='green' ml='3' onClick={handleApprove}>
							Yes
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			<AlertDialog
				leastDestructiveRef={declineCancelRef}
				onClose={declineOnClose}
				isOpen={declineIsOpen}
				isCentered
			>
				<AlertDialogOverlay />
				<AlertDialogContent>
					<AlertDialogHeader>Decline {wordInfo.word}?</AlertDialogHeader>
					<AlertDialogCloseButton />
					<AlertDialogFooter>
						<Button ref={declineCancelRef} onClick={declineOnClose}>
							No
						</Button>
						<Button colorScheme='green' ml='3' onClick={handleDecline}>
							Yes
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</Box>
	)
}

function Dashboard () {
	const [words, setWords] = useState(null)

	useEffect(() => {
		let mounted = true

		async function fetchData () {
			try {
				const data = await fetch('/api/words/unapproved')
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
	}, [])

	return (
		<>
			<SEO />
			<VStack>
				<Box w={{ base: 'full', sm: 'fit-content' }} my='4' textStyle='paragraph'>
					<Heading textAlign='center'>Dashboard</Heading>
					<Text>Only 20 unapproved words will show at a time, sorted oldest to newest</Text>
				</Box>
				{
					words ?
						words.length ?
							<Flex direction='row' wrap='wrap' justify='center' w='100%'>
								{words.map(wordInfo => <WordRow key={wordInfo.word} wordInfo={wordInfo} />)}
							</Flex> :
							<Text>
								We&apos;re all caught up!
							</Text> :
						<Center>
							<Spinner />
						</Center>
				}
			</VStack>
		</>
	)
}

WordRow.propTypes = {
	wordInfo: PropTypes.object
}

export default Dashboard
