import React, { useReducer, useState } from 'react'
import PropTypes from 'prop-types'
import { Box,
	Stack,
	FormControl,
	FormLabel,
	Input,
	Button,
	FormErrorMessage,
	InputGroup,
	Alert,
	AlertIcon } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

function RegisterForm ({ openLoginModal }) {
	const [formState, formDispatch] = useReducer((state, action) => ({ ...state, [action.field]: action.value }), {
		name: '',
		password: '',
		passwordConfirmation: ''
	})
	const [errorState, setErrors] = useState({ name: '', password: '', message: '' })
	const [isLoading, setLoading] = useState(false)
	const history = useHistory()

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
			const res = await fetch('/api/users/register', {
				method: 'POST',
				body: JSON.stringify(formState),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if (res.status !== 200) {
				const errors = await res.json()

				for (const errKey in errors) {
					if (errKey !== 'message') {
						formDispatch({
							field: errKey,
							value: ''
						})
					}
				}

				setErrors(errors)
				setLoading(false)
			}
			// register success,
			// check if logging in from modal, or /register page
			else if (openLoginModal) {
				openLoginModal()
			}
			else {
				// logging in from /register page, should redirect to login
				history.push('/login')
			}
		}
		catch (err) {
			setErrors({
				password: 'Something broke... Try again?'
			})
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
								type='password'
								variant='filled'
								required
								onChange={handleInput}
								value={formState.password}
							></Input>
						</InputGroup>
						<FormErrorMessage>{errorState.password}</FormErrorMessage>
					</FormControl>
					<FormControl id='passwordConfirmation' isInvalid={!!errorState.passwordConfirmation}>
						<FormLabel>Confirm Password</FormLabel>
						<InputGroup>
							<Input
								name='passwordConfirmation'
								type='password'
								variant='filled'
								required
								onChange={handleInput}
								value={formState.passwordConfirmation}
							></Input>
						</InputGroup>
						<FormErrorMessage>{errorState.passwordConfirmation}</FormErrorMessage>
					</FormControl>
					<Button type='submit' colorScheme='blue' isLoading={isLoading}>Create account</Button>
				</Stack>
			</form>
		</Box>
	)
}

RegisterForm.propTypes = {
	openLoginModal: PropTypes.func
}

export default RegisterForm
