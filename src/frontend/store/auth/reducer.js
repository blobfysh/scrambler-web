import { SIGN_IN, SIGN_IN_ERROR } from './actions'

const initialState = {}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SIGN_IN:
			return {
				...state,
				role: action.user.role,
				name: action.user.name,
				createdAt: action.user.createdAt
			}
		case SIGN_IN_ERROR:
			return {
				...state,
				error: action.error
			}
		default:
			return state
	}
}

export default reducer
