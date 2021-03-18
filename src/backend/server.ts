import * as dotenv from 'dotenv'
import path from 'path'
import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'
import routes from './routes'

// load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 7000

// connect to mongodb
mongoose.connect(process.env.MONGO_URI as string, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
}).then(() => {
	// set up middleware
	app.use(express.urlencoded({ extended: false }))
	app.use(express.json())
	app.use(session({
		name: 'scramblin',
		secret: process.env.SESSION_SECRET as string,
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: process.env.NODE_ENV === 'production'
		},
		store: MongoStore.create({
			client: mongoose.connection.getClient()
		})
	}))

	// set up routes
	app.use('/', express.static(path.join(__dirname, '..', 'frontend')))
	app.use('/api', routes.api)
	app.get('/*', (req, res) => {
		res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'))
	})

	// start app
	app.listen(PORT, () => {
		console.log(`Server running on port: ${PORT}`)
	})
}).catch(err => {
	console.error(err)
})
