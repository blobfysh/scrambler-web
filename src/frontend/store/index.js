import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import authReducer from './auth/reducer'

const middleware = [thunk]

const rootReducer = combineReducers({
	auth: authReducer
})

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(...middleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
)

export default store
