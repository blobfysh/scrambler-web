export const SIGN_IN = 'SIGN_IN'
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR'

export async function fetchLoggedIn (dispatch) {
	try {
		const res = await fetch('/api/users/me')
		const user = await res.json()

		if (user) {
			dispatch({ type: SIGN_IN, user })
		}
	}
	catch (error) {
		dispatch({ type: SIGN_IN_ERROR, error: 'Failed to sign in' })
	}
}
