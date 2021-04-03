export const SIGN_IN = 'SIGN_IN'
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR'
export const SIGN_IN_LOADING = 'SIGN_IN_LOADING'

export async function fetchLoggedIn (dispatch) {
	try {
		dispatch({ type: SIGN_IN_LOADING })

		const res = await fetch('/api/users/me')
		const user = await res.json()

		if (user) {
			dispatch({ type: SIGN_IN, user })
		}
		else {
			dispatch({ type: SIGN_IN_ERROR, error: 'Failed to sign in' })
		}
	}
	catch (error) {
		dispatch({ type: SIGN_IN_ERROR, error: 'Failed to sign in' })
	}
}
