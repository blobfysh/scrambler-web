import { SIGN_IN, SIGN_IN_ERROR, SIGN_IN_LOADING } from './actions'

const initialState = {
	error: null,
	status: 'idle'
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SIGN_IN:
			return {
				...state,
				role: action.user.role,
				name: action.user.name,
				createdAt: action.user.createdAt,
				status: 'succeeded'
			}
		case SIGN_IN_ERROR:
			return {
				...state,
				error: action.error,
				status: 'failed'
			}
		case SIGN_IN_LOADING:
			return {
				...state,
				status: 'loading'
			}
		default:
			return state
	}
}

export default reducer
