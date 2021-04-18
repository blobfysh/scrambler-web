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
import UserDropdown from '../UserDropdown'

function NavLinks () {
	return (
		<>
			<Link
				as={RouterLink}
				to='/browse'
				style={{
					textDecoration: 'none'
				}}
			>
				Browse
			</Link>
			<Link
				as={RouterLink}
				to='/docs'
				style={{
					textDecoration: 'none'
				}}
			>
				API
			</Link>
		</>
	)
}

function UserLinks ({ loginOnOpen, registerOnOpen }) {
	const location = useLocation()
	const user = useSelector(state => state.auth)

	return (
		<HStack spacing='4'>
			{
				// dont render login button if already on login page or logged in
				user.status !== 'loading' && !user.name && location.pathname !== '/login' &&
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
				user.status !== 'loading' && !user.name && location.pathname !== '/register' &&
				<Button
					onClick={registerOnOpen}
					colorScheme='blue'
				>
					Register
				</Button>
			}
			{
				user.status !== 'loading' && user.name &&
				<UserDropdown user={user} />
			}
		</HStack>
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
						<HStack spacing='4'>
							<Link
								as={RouterLink}
								to='/'
								style={{
									textDecoration: 'none'
								}}
							>
								<Heading size='lg' textAlign='center'>Scrambled Words 😳</Heading>
							</Link>
							<HStack spacing='4' display={{ base: 'none', md: 'unset' }}>
								<NavLinks />
							</HStack>
						</HStack>
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
						<Box
							display={{ base: 'none', md: 'flex' }}
						>
							<UserLinks loginOnOpen={loginOnOpen} registerOnOpen={registerOnOpen} />
						</Box>
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
						<NavLinks />
						<UserLinks loginOnOpen={loginOnOpen} registerOnOpen={registerOnOpen} />
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

UserLinks.propTypes = {
	loginOnOpen: PropTypes.func,
	registerOnOpen: PropTypes.func
}

export default Header
