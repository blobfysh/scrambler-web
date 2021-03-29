import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'

// lazy loading pages for webpack code splitting
const Home = lazy(() => import('./pages/index'))
const Register = lazy(() => import('./pages/register'))
const Login = lazy(() => import('./pages/login'))

import './app.scss'

function App () {
	return (
		<Router>
			<Switch>
				<Suspense fallback={<span>Loading...</span>}>
					<Route exact path='/' component={Home} />
					<PrivateRoute level='noUser' noAuthRedirect='/' exact path='/register' component={Register} />
					<PrivateRoute level='noUser' noAuthRedirect='/' exact path='/login' component={Login} />
				</Suspense>
			</Switch>
		</Router>
	)
}

export default App
