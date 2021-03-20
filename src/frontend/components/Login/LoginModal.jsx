import React from 'react'
import PropTypes from 'prop-types'
import { Box,
	Heading,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	ModalBody,
	VStack,
	Text,
	Link } from '@chakra-ui/react'
import LoginForm from './LoginForm'

function LoginModal ({ isOpen, onClose, openRegisterModal }) {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalCloseButton />
				<ModalBody>
					<Box my='4'>
						<VStack textAlign='center'>
							<Heading>Sign in</Heading>
							<Text>No account?{' '}
								<Link
									onClick={openRegisterModal}
									color='blue.600'
								>
									Register
								</Link>
							</Text>
						</VStack>
					</Box>
					<LoginForm />
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}

LoginModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	openRegisterModal: PropTypes.func.isRequired
}

export default LoginModal
