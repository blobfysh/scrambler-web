import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import authReducer from './auth/reducer'

const middleware = [thunk]

const rootReducer = combineReducers({
	auth: authReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
	rootReducer,
	composeEnhancers(
		applyMiddleware(...middleware)
	)
)

export default store
