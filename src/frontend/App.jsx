import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// lazy loading pages for webpack code splitting
const Home = lazy(() => import('./pages/index'))
const Register = lazy(() => import('./pages/register'))
const Login = lazy(() => import('./pages/login'))

import './app.scss'

function App () {
	return (
		<Router>
			<Suspense fallback={<span>Loading...</span>}>
				<Route exact path='/' component={Home} />
				<Route exact path='/register' component={Register} />
				<Route exact path='/login' component={Login} />
			</Suspense>
		</Router>
	)
}

export default App
