import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'

// lazy loading pages for webpack code splitting
const Home = lazy(() => import('./pages/index'))
const Register = lazy(() => import('./pages/register'))
const Login = lazy(() => import('./pages/login'))
const Submit = lazy(() => import('./pages/submit'))
const NotFound = lazy(() => import('./pages/404'))

import './app.scss'

function App () {
	return (
		<Router>
			<Suspense fallback={<span>Loading...</span>}>
				<Switch>
					<Route exact path='/' component={Home} />
					<PrivateRoute level='noUser' noAuthRedirect='/' exact path='/register' component={Register} />
					<PrivateRoute level='noUser' noAuthRedirect='/' exact path='/login' component={Login} />
					<PrivateRoute level='user' noAuthRedirect='/login' exact path='/submit' component={Submit} />
					<Route path='*' component={NotFound} />
				</Switch>
			</Suspense>
		</Router>
	)
}

export default App
