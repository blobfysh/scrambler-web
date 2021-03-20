import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './pages/index'
import Register from './pages/register'
import Login from './pages/login'
import './app.scss'

function App () {
	return (
		<Router>
			<Route exact path='/' component={Home} />
			<Route exact path='/register' component={Register} />
			<Route exact path='/login' component={Login} />
		</Router>
	)
}

export default App
