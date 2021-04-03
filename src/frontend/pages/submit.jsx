import React, { useReducer, useState } from 'react'
import SEO from '../components/SEO'
import MotionBox from '../components/MotionBox'
import { HiPlus, HiCheckCircle } from 'react-icons/hi'
import { Box,
	Heading,
	Stack,
	FormControl,
	FormLabel,
	Input,
	Button,
	FormErrorMessage,
	Select,
	VStack,
	IconButton,
	Text,
	Icon } from '@chakra-ui/react'

function Submit () {
	const [formState, formDispatch] = useReducer((state, action) => ({ ...state, [action.field]: action.value }), {
		word: '',
		difficulty: 'medium',
		definition: ''
	})
	const [rhymeWords, setRhymeWords] = useState(['', '', ''])
	const [errorState, setErrors] = useState({ word: '', difficulty: '', definition: '', rhymesWith: '' })
	const [isLoading, setLoading] = useState(false)
	const [thirdRhyme, setThirdRhyme] = useState(false)
	const [success, setSuccess] = useState(false)

	const handleInput = e => {
		console.log(e.target.id)

		formDispatch({
			field: e.target.id,
			value: e.target.value
		})
	}

	const handleSubmit = async e => {
		e.preventDefault()

		setLoading(true)

		console.log({
			...formState,
			rhymesWith: rhymeWords.filter(word => word)
		})

		try {
			const res = await fetch('/api/words', {
				method: 'POST',
				body: JSON.stringify({
					...formState,
					rhymesWith: rhymeWords.filter(word => word)
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if (res.status !== 200) {
				const errors = await res.json()

				setErrors(errors)
			}
			else {
				setSuccess(true)
			}

			setLoading(false)
		}
		catch (err) {
			setErrors({
				word: 'Something broke... Try again?'
			})
			setLoading(false)
		}
	}

	return (
		<>
			<SEO
				title='Submit a word'
				description='Submit a new scramble word.'
			/>
			<VStack>
				<Box my='4' textStyle='paragraph'>
					<VStack textAlign='center'>
						<Heading>Submit a new scramble word</Heading>
					</VStack>
				</Box>
				<MotionBox
					boxShadow='md'
					border='1px'
					borderColor='gray.600'
					p='3'
					rounded='lg'
					w='100%'
					layout
				>
					{
						!success ?
							<form
								onSubmit={handleSubmit}
							>
								<Stack spacing='6'>
									<FormControl id='word' isInvalid={!!errorState.word}>
										<FormLabel>Word</FormLabel>
										<Input
											name='word'
											type='text'
											variant='filled'
											required
											onChange={handleInput}
											value={formState.word}
										/>
										<FormErrorMessage>{errorState.word}</FormErrorMessage>
									</FormControl>
									<FormControl id='definition' isInvalid={!!errorState.definition}>
										<FormLabel>Definition</FormLabel>
										<Input
											name='definition'
											type='text'
											variant='filled'
											required
											onChange={handleInput}
											value={formState.definition}
										/>
										<FormErrorMessage>{errorState.definition}</FormErrorMessage>
									</FormControl>
									<FormControl id='difficulty' isInvalid={!!errorState.difficulty}>
										<FormLabel>Difficulty</FormLabel>
										<Select variant='filled' value={formState.difficulty} onChange={handleInput}>
											<option value='easy'>Easy</option>
											<option value='medium'>Medium</option>
											<option value='hard'>Hard</option>
										</Select>
										<FormErrorMessage>{errorState.difficulty}</FormErrorMessage>
									</FormControl>
									<FormControl id='rhymesWith' isInvalid={!!errorState.rhymesWith}>
										<FormLabel>Rhyming Words (used as a hint)</FormLabel>
										<VStack>
											<Input
												name='rhymesWith'
												type='text'
												variant='filled'
												required
												onChange={e => setRhymeWords(prev => [e.target.value, ...prev.slice(1)])}
												value={rhymeWords[0]}
											/>
											<Input
												name='rhymesWith'
												type='text'
												variant='filled'
												required
												onChange={e => setRhymeWords(prev => [...prev.slice(0, 1), e.target.value, ...prev.slice(2)])}
												value={rhymeWords[1]}
											/>
											{
												thirdRhyme ?
													<Input
														name='rhymesWith'
														type='text'
														variant='filled'
														onChange={e => setRhymeWords(prev => [...prev.slice(0, 2), e.target.value])}
														value={rhymeWords[2]}
													/> :
													<IconButton
														colorScheme='green'
														aria-label='Add third rhyming word'
														icon={<HiPlus size='1.5em' />}
														onClick={() => setThirdRhyme(true)}
													/>
											}
										</VStack>
										<FormErrorMessage>{errorState.rhymesWith}</FormErrorMessage>
									</FormControl>
									<Button type='submit' colorScheme='blue' isLoading={isLoading}>Submit word</Button>
								</Stack>
							</form> :
							<MotionBox
								initial={{
									opacity: 0
								}}
								animate={{
									opacity: 1
								}}
								transition={{
									delay: 0.5
								}}
							>
								<Text textAlign='center'><Icon color='green.400' as={HiCheckCircle} w={6} h={6} /> Thank you for your submission! The mods will review it soon.</Text>
							</MotionBox>
					}
				</MotionBox>
			</VStack>
		</>
	)
}

export default Submit
