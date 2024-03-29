import React from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import { Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, MenuGroup, Link } from '@chakra-ui/react'
import { HiOutlineChevronDown } from 'react-icons/hi'

function UserDropdown ({ user }) {
	return (
		<Menu isLazy>
			<MenuButton
				colorScheme='green'
				variant='solid'
				as={Button}
				rightIcon={<HiOutlineChevronDown size='1.2em' />}
			>
				Account
			</MenuButton>
			<MenuList>
				<MenuGroup title={`Hello, ${user.name}`}>
					{
						['mod', 'admin'].includes(user.role) &&
						<Link as={RouterLink} to='/dashboard' style={{ textDecoration: 'none' }}>
							<MenuItem color='blue.200'>Mod Dashboard</MenuItem>
						</Link>
					}
					<Link as={RouterLink} to='/submit' style={{ textDecoration: 'none' }}>
						<MenuItem>Submit a new word</MenuItem>
					</Link>
					<Link as={RouterLink} to='/account/words' style={{ textDecoration: 'none' }}>
						<MenuItem>Submitted words</MenuItem>
					</Link>
				</MenuGroup>
				<MenuDivider />
				<Link href='/api/users/logout' style={{ textDecoration: 'none' }}>
					<MenuItem color='red.200'>Sign out</MenuItem>
				</Link>
			</MenuList>
		</Menu>
	)
}

UserDropdown.propTypes = {
	user: PropTypes.object.isRequired
}

export default UserDropdown
