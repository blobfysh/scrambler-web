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
	config: {
		initialColorMode: 'dark'
	},
	styles: {
		global: {
			body: {
				bg: 'gray.700',
				color: 'gray.50',
				height: '100%'
			},
			html: {
				height: '100%'
			}
		}
	},
	textStyles: {
		paragraph: {
			textColor: 'gray.50'
		},
		h1: {
			textColor: 'white',
			fontSize: {
				base: '3xl',
				sm: '3xl',
				md: '4xl',
				lg: '5xl'
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
