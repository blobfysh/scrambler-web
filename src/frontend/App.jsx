import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TopBarProgress from 'react-topbar-progress-indicator'
import PrivateRoute from './components/PrivateRoute'
import Layout from './components/Layout/Layout'

// lazy loading pages for webpack code splitting
const Home = lazy(() => import('./pages/index'))
const Register = lazy(() => import('./pages/register'))
const Login = lazy(() => import('./pages/login'))
const Submit = lazy(() => import('./pages/submit'))
const Dashboard = lazy(() => import('./pages/dashboard'))
const NotFound = lazy(() => import('./pages/404'))
const API = lazy(() => import('./pages/docs'))
const Browse = lazy(() => import('./pages/browse'))


// account routes
const Words = lazy(() => import('./pages/account/words'))

import './app.scss'

TopBarProgress.config({
	barColors: {
		'0': '#90cdf4',
		'1.0': '#90cdf4'
	}
})

function App () {
	return (
		<Router>
			<Layout>
				<Suspense fallback={<TopBarProgress />}>
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/docs' component={API} />
						<Route exact path='/browse' component={Browse} />
						<PrivateRoute level='noUser' noAuthRedirect='/' exact path='/register' component={Register} />
						<PrivateRoute level='noUser' noAuthRedirect='/' exact path='/login' component={Login} />
						<PrivateRoute level='user' noAuthRedirect='/login' exact path='/submit' component={Submit} />
						<PrivateRoute level='user' noAuthRedirect='/login' exact path='/account/words' component={Words} />
						<PrivateRoute level='mod' noAuthRedirect='/login' exact path='/dashboard' component={Dashboard} />
						<Route path='*' component={NotFound} />
					</Switch>
				</Suspense>
			</Layout>
		</Router>
	)
}

export default App
