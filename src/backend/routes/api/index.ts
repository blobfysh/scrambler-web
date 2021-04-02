import { Router, Request, Response } from 'express'
import usersRouter from './users'
import wordsRouter from './words'
import Word from '../../models/Word'

const router = Router()

// could use swagger-ui-express to generate api docs
router.get('/random', async (req: Request, res: Response) => {
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

// should give amount of approved/unapproved words
router.get('/stats', async (req: Request, res: Response) => {
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
