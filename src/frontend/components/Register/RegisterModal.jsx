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
import RegisterForm from './RegisterForm'

function RegisterModal ({ isOpen, onClose, openLoginModal }) {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalCloseButton />
				<ModalBody>
					<Box my='4'>
						<VStack textAlign='center'>
							<Heading>Create an account</Heading>
							<Text>Already have an account?{' '}
								<Link
									onClick={openLoginModal}
									color='blue.600'
								>
									Login
								</Link>
							</Text>
						</VStack>
					</Box>
					<RegisterForm openLoginModal={openLoginModal} />
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}

RegisterModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	openLoginModal: PropTypes.func.isRequired
}

export default RegisterModal
