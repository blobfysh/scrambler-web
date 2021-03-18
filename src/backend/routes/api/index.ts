import { Router, Request, Response } from 'express'
import usersRouter from './users'
import wordsRouter from './words'

const router = Router()

// could use swagger-ui-express to generate api docs
router.get('/random', (req: Request, res: Response) => {
	// will use a mongoose method to find random word with approved: true
	res.sendStatus(200)
})

// should give amount of approved/unapproved words
router.get('/stats', (req: Request, res: Response) => {
	res.sendStatus(200)
})

router.use('/users', usersRouter)

router.use('/words', wordsRouter)

export default router
