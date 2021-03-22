import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import store from './store'
import { fetchLoggedIn } from './store/auth/actions'
import App from './App'

// fire fetchLoggedIn action to update redux state with currently logged in user
store.dispatch(fetchLoggedIn)

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ChakraProvider>
				<App />
			</ChakraProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('app')
)
