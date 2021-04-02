import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

// possible levels are user (requires user to be logged in), noUser (requires user to be logged out),
// mod (requires user role to be mod), and admin (requires user to be admin)

function isAllowed (user, level) {
	switch (level) {
		case 'user':
			return !!user.name
		case 'noUser':
			return !user.name
		case 'mod':
			return ['mod', 'admin'].includes(user.role)
		case 'admin':
			return user.role === 'admin'
		default:
			return false
	}
}

function PrivateRoute ({ level, noAuthRedirect, component: Component, ...rest }) {
	const user = useSelector(state => state.auth)

	return (
		<Route
			{...rest}
			render={props =>
				isAllowed(user, level) ? (
					<Component {...props} />
				) : (
					<Redirect to={noAuthRedirect} />
				)
			}
		/>
	)
}

PrivateRoute.propTypes = {
	level: PropTypes.oneOf(['user', 'noUser', 'mod', 'admin']).isRequired,
	noAuthRedirect: PropTypes.string.isRequired,
	component: PropTypes.node.isRequired
}

PrivateRoute.defaultProps = {
	level: 'user',
	noAuthRedirect: '/login'
}

export default PrivateRoute
