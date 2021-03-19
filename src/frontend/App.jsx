import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './pages/index'
import Register from './Register'
import './app.scss'

function App () {
	return (
		<Router>
			<Route exact path='/' component={Home} />
			<Route exact path='/register' component={Register} />
		</Router>
	)
}

export default App
