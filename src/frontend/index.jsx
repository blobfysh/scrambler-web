import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import store from './store'
import { fetchLoggedIn } from './store/auth/actions'
import App from './App'

// fire fetchLoggedIn action to update redux state with currently logged in user
store.dispatch(fetchLoggedIn)

const theme = extendTheme({
	styles: {
		global: {
			body: {
				bg: 'gray.50'
			}
		}
	}
})

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ChakraProvider theme={theme}>
				<App />
			</ChakraProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('app')
)
