import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import { Heading,
	Box,
	Stack,
	Button,
	Link,
	HStack,
	IconButton,
	useDisclosure } from '@chakra-ui/react'
import { HiMenu, HiOutlineX } from 'react-icons/hi'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoginModal from '../Login/LoginModal'
import RegisterModal from '../Register/RegisterModal'
import Container from '../Container'

function Links ({ loginOnOpen, registerOnOpen }) {
	const location = useLocation()
	const user = useSelector(state => state.auth)

	return (
		<>
			<Link
				as={RouterLink}
				to='/login'
				style={{
					textDecoration: 'none'
				}}
			>
				API
			</Link>
			<HStack>
				{
					// dont render login button if already on login page or logged in
					!user.name && location.pathname !== '/login' &&
					<Button
						onClick={loginOnOpen}
						variant='outline'
						_hover={{ bg: 'gray.700' }}
						_active={{
							bg: 'gray.700'
						}}
					>
						Login
					</Button>
				}
				{
					// dont render register button if already on register page or logged in
					!user.name && location.pathname !== '/register' &&
					<Button
						onClick={registerOnOpen}
						colorScheme='blue'
					>
						Register
					</Button>
				}
			</HStack>
		</>
	)
}

function Header () {
	const [menuOpen, toggleMenu] = useReducer(state => !state, false)
	const { isOpen: loginOpen, onOpen: loginOnOpen, onClose: loginOnClose } = useDisclosure()
	const { isOpen: registerOpen, onOpen: registerOnOpen, onClose: registerOnClose } = useDisclosure()

	return (
		<>
			<Box
				as='header'
				p='3'
				bg='gray.800'
				textColor='white'
			>
				<Container>
					<Stack
						direction='row'
						alignItems='center'
						justifyContent='space-between'
						wrap='nowrap'
						minH='3rem'
					>
						<Link
							as={RouterLink}
							to='/'
							style={{
								textDecoration: 'none'
							}}
						>
							<Heading size='lg' textAlign='center'>Scrambled Words 😳</Heading>
						</Link>
						<IconButton
							aria-label='Open Menu'
							_hover={{ bg: 'gray.700' }}
							_active={{
								bg: 'gray.700'
							}}
							bg='transparent'
							icon={menuOpen ? <HiOutlineX size='2em' /> : <HiMenu size='2em' />}
							display={{ base: 'flex', md: 'none' }}
							onClick={toggleMenu}
						/>
						<Stack
							direction={{ base: 'column', sm: 'row' }}
							alignItems='center'
							spacing={{ sm: '4', base: '2' }}
							display={{ base: 'none', md: 'flex' }}
						>
							<Links loginOnOpen={loginOnOpen} registerOnOpen={registerOnOpen} />
						</Stack>
					</Stack>
				</Container>
				{
					menuOpen &&
					<Stack
						direction='column'
						alignItems='center'
						spacing='4'
						mt='4'
						display={{ base: 'flex', md: 'none' }}
					>
						<Links loginOnOpen={loginOnOpen} registerOnOpen={registerOnOpen} />
					</Stack>
				}
			</Box>
			<LoginModal isOpen={loginOpen} onClose={loginOnClose} openRegisterModal={() => {
				loginOnClose()
				registerOnOpen()
			}} />
			<RegisterModal isOpen={registerOpen} onClose={registerOnClose} openLoginModal={() => {
				registerOnClose()
				loginOnOpen()
			}} />
		</>
	)
}

Links.propTypes = {
	loginOnOpen: PropTypes.func,
	registerOnOpen: PropTypes.func
}

export default Header
