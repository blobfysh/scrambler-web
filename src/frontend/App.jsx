import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Layout from './components/Layout/Layout'

// lazy loading pages for webpack code splitting
const Home = lazy(() => import('./pages/index'))
const Register = lazy(() => import('./pages/register'))
const Login = lazy(() => import('./pages/login'))
const Submit = lazy(() => import('./pages/submit'))
const NotFound = lazy(() => import('./pages/404'))

// account routes
const Words = lazy(() => import('./pages/account/words'))

import './app.scss'

function App () {
	return (
		<Router>
			<Layout>
				<Suspense fallback={<span>Loading...</span>}>
					<Switch>
						<Route exact path='/' component={Home} />
						<PrivateRoute level='noUser' noAuthRedirect='/' exact path='/register' component={Register} />
						<PrivateRoute level='noUser' noAuthRedirect='/' exact path='/login' component={Login} />
						<PrivateRoute level='user' noAuthRedirect='/login' exact path='/submit' component={Submit} />
						<PrivateRoute level='user' noAuthRedirect='/login' exact path='/account/words' component={Words} />
						<Route path='*' component={NotFound} />
					</Switch>
				</Suspense>
			</Layout>
		</Router>
	)
}

export default App
