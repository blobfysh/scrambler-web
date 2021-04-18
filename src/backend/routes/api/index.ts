import { Router, Request, Response } from 'express'
import rateLimit from 'express-rate-limit'
import usersRouter from './users'
import wordsRouter from './words'
import Word from '../../models/Word'
import cors from 'cors'

const router = Router()

// max 300 requests per minute
const randomLimiter = rateLimit({
	windowMs: 60 * 1000,
	max: 300,
	message: {
		status: 429,
		message: 'Too many requests, please try again later.'
	}
})

// could use swagger-ui-express to generate api docs
router.get('/random', cors(), randomLimiter, async (req: Request, res: Response) => {
	try {
		const approvedCount = await Word.countDocuments({ approved: true })
		const rand = Math.floor(Math.random() * approvedCount)

		const randomWord = await Word.findOne({ approved: true }).skip(rand).select('word rhymesWith definition difficulty -_id').exec()

		res.status(200).json(randomWord)
	}
	catch (err) {
		res.sendStatus(500)
	}
})

// max 1000 requests per minute
const statsLimiter = rateLimit({
	windowMs: 30 * 60 * 1000,
	max: 1000,
	message: {
		status: 429,
		message: 'Too many requests, please try again later.'
	}
})

// should give amount of approved/unapproved words
router.get('/stats', statsLimiter, async (req: Request, res: Response) => {
	try {
		const approved = await Word.countDocuments({ approved: true })
		const unapproved = await Word.countDocuments({ approved: false })

		res.status(200).json({
			approved,
			unapproved
		})
	}
	catch (err) {
		res.sendStatus(500)
	}
})

router.use('/users', usersRouter)

router.use('/words', wordsRouter)

export default router
