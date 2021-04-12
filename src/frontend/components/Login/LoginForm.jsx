import React, { useReducer, useState } from 'react'
import { HiEyeOff, HiEye } from 'react-icons/hi'
import { Box,
	Stack,
	FormControl,
	FormLabel,
	Input,
	Button,
	FormErrorMessage,
	IconButton,
	InputRightElement,
	InputGroup,
	Alert,
	AlertIcon } from '@chakra-ui/react'

function LoginForm () {
	const [passShowing, togglePassShow] = useReducer(state => !state, false)
	const [formState, formDispatch] = useReducer((state, action) => ({ ...state, [action.field]: action.value }), {
		name: '',
		password: ''
	})
	const [errorState, setErrors] = useState({ name: '', password: '', message: '' })
	const [isLoading, setLoading] = useState(false)

	const handleInput = e => {
		formDispatch({
			field: e.target.id,
			value: e.target.value
		})
	}

	const handleSubmit = async e => {
		e.preventDefault()

		setLoading(true)

		try {
			const res = await fetch('/api/users/login', {
				method: 'POST',
				body: JSON.stringify(formState),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if (res.status !== 200) {
				const errors = await res.json()

				for (const errKey in errors) {
					formDispatch({
						field: errKey,
						value: ''
					})
				}

				setErrors(errors)
			}
			else {
				// login successful, using full page refresh so auth state can update
				window.location.replace('/')
			}
		}
		catch (err) {
			setErrors({
				password: 'Something broke... Try again?'
			})
		}
		finally {
			setLoading(false)
		}
	}

	return (
		<Box
			w='full'
			p='3'
		>
			<form
				onSubmit={handleSubmit}
			>
				<Stack spacing='6'>
					{
						!!errorState.message &&
						<Alert status='error' rounded='md'>
							<AlertIcon />
							{errorState.message}
						</Alert>
					}
					<FormControl id='name' isInvalid={!!errorState.name}>
						<FormLabel>Username</FormLabel>
						<Input
							name='name'
							type='text'
							variant='filled'
							required
							onChange={handleInput}
							value={formState.name}
						></Input>
						<FormErrorMessage>{errorState.name}</FormErrorMessage>
					</FormControl>
					<FormControl id='password' isInvalid={!!errorState.password}>
						<FormLabel>Password</FormLabel>
						<InputGroup>
							<Input
								name='password'
								type={passShowing ? 'text' : 'password'}
								variant='filled'
								required
								onChange={handleInput}
								value={formState.password}
							></Input>
							<InputRightElement>
								<IconButton
									aria-label={passShowing ? 'Hide password' : 'Show password'}
									bg='transparent !important'
									variant='ghost'
									icon={passShowing ? <HiEyeOff size='1.4em' /> : <HiEye size='1.4em' />}
									onClick={togglePassShow}
									color='gray.50'
								/>
							</InputRightElement>
						</InputGroup>
						<FormErrorMessage>{errorState.password}</FormErrorMessage>
					</FormControl>
					<Button type='submit' colorScheme='blue' isLoading={isLoading}>Sign in</Button>
				</Stack>
			</form>
		</Box>
	)
}

export default LoginForm
