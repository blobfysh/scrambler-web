import React, { useEffect } from 'react'
import Lol from './Lol'
import './app.scss'

function App () {
	useEffect(async () => {
		const res = await fetch('/api/users/me')

		console.log('hi')
		console.log(await res.json())
	}, [])

	return (
		<>
			<div className='test'>Welcome to webpack 5 react 17 app!</div>
			<Lol />
		</>
	)
}

export default App
