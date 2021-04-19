import { Router, Request, Response } from 'express'
import Joi from 'joi'
import validate from '../../middleware/validate'
import { checkLoggedIn, checkIsMod } from '../../middleware/auth'
import Word from '../../models/Word'
import { Word as WordType } from '../../types/Word'
import escapeStringRegexp from 'escape-string-regexp'
import rateLimit from 'express-rate-limit'

const router = Router()

interface PaginatedResult {
	next: boolean
	previous: boolean
	words: WordType[]
}

// max 60 requests per minute
const browseLimiter = rateLimit({
	windowMs: 60 * 1000,
	max: 60,
	message: {
		status: 429,
		message: 'Too many requests, please try again later.'
	}
})
const browseQuerySchema = Joi.object({
	page: Joi.number().label('Page'),
	word: Joi.string().label('Word')
})
// used to browse words
router.get(
	'/',
	validate(browseQuerySchema, 'query'),
	browseLimiter,
	async (req: Request, res: Response) => {
		try {
			const page = Math.max(0, parseInt(req.query.page as string ?? 1) - 1)
			// limit cannot be changed right now but can easily be changed in future
			const limit = 12

			// result.previous can be used by frontend to tell if user can go to previous page,
			// same idea for result.next
			const result: PaginatedResult = {
				next: false,
				previous: false,
				words: []
			}
			if (page > 0) {
				result.previous = true
			}

			if (req.query.word) {
				// using regex to mimic sql LIKE query
				const $regex = escapeStringRegexp(req.query.word as string)

				const wordsCount = await Word.countDocuments({ word: { $regex, $options: 'i' }, approved: true })
				const words = await Word
					.find({ word: { $regex, $options: 'i' }, approved: true })
					.skip(page * limit)
					.limit(limit)
					.sort('-createdAt')
					.populate('createdBy', 'name')
					.select('word difficulty createdAt')

				result.words = words

				if ((page + 1) * limit < wordsCount) {
					result.next = true
				}

				res.status(200).json(result)
			}
			else {
				const approvedCount = await Word.countDocuments({ approved: true })
				const words = await Word
					.find({ approved: true })
					.skip(page * limit)
					.limit(limit)
					.sort('-createdAt')
					.populate('createdBy', 'name')
					.select('word difficulty createdAt')

				result.words = words

				if ((page + 1) * limit < approvedCount) {
					result.next = true
				}

				res.status(200).json(result)
			}
		}
		catch (err) {
			res.sendStatus(500)
		}
	}
)

const wordSchema = Joi.object({
	word: Joi.string().min(4).max(30).regex(/^[A-Za-z]+$/).required()
		.label('Word')
		.messages({
			'string.min': 'Word must be at least 4 characters long',
			'string.pattern.base': 'Words only support alphanumeric characters'
		}),
	difficulty: Joi.string().valid('easy', 'medium', 'hard').required(),
	rhymesWith: Joi.array().items(Joi.string().trim().regex(/^[A-Za-z]+$/).required()).min(2).max(3).required()
		.messages({
			'array.min': 'You must enter at least 2 words that rhyme',
			'array.max': 'You can enter up to 3 words that rhyme',
			'string.pattern.base': 'Rhyming words can only contain alphanumeric characters (no spaces either)'
		}),
	definition: Joi.string().trim().max(150).required()
		.messages({
			'string.empty': 'You should enter a definition for this word'
		})
})

// creates a new word, requires user to be logged in
router.post(
	'/',
	checkLoggedIn,
	// use validation middleware to validate req.body against Joi schema
	validate(wordSchema, 'body'),
	async (req: Request, res: Response) => {
		try {
			// make sure word doesnt already exist in database using collation
			const word = await Word.findOne({ word: req.body.word }, null, { collation: { locale: 'en', strength: 2 } })

			if (word) {
				return res.status(400).json({ word: 'Word already exists' })
			}

			const newWord = new Word({
				word: `${req.body.word.charAt(0).toUpperCase()}${req.body.word.slice(1).toLowerCase()}`,
				difficulty: req.body.difficulty,
				rhymesWith: req.body.rhymesWith,
				definition: req.body.definition,
				// checkLoggedIn middleware already checks if user exists
				createdBy: req.session.user!._id
			})

			const savedWord = await newWord.save()

			res.status(200).json(savedWord)
		}
		catch (err) {
			console.log(err)
			res.sendStatus(500)
		}
	}
)

// word params schema used by patch /:word and delete /:word
const wordParamsSchema = Joi.object({
	word: Joi.string().min(4).max(30).regex(/^[A-Za-z]+$/).required()
		.label('Word')
		.messages({
			'string.pattern.base': 'Words only support alphanumeric characters'
		})
})
const approveBodySchema = Joi.object({
	approved: Joi.boolean().required()
})

// used by mods to approve/unapprove a word
router.patch(
	'/:word',
	checkIsMod,
	// use validation middleware to validate req.params against Joi schema
	validate(wordParamsSchema, 'params'),
	validate(approveBodySchema, 'body'),
	async (req: Request, res: Response) => {
		try {
			// make sure word exists
			const word = await Word.findOne({ word: req.params.word }, null, { collation: { locale: 'en', strength: 2 } })

			if (!word) {
				return res.status(400).json({ word: 'Word does not exist' })
			}

			word.approved = req.body.approved

			const updatedWord = await word.save()

			res.status(200).json(updatedWord)
		}
		catch (err) {
			console.log(err)
			res.sendStatus(500)
		}
	}
)

// used by mods to decline a word
router.delete(
	'/:word',
	checkIsMod,
	// use validation middleware to validate req.params against Joi schema
	validate(wordParamsSchema, 'params'),
	async (req: Request, res: Response) => {
		try {
			// make sure word exists
			const word = await Word.findOne({ word: req.params.word }, null, { collation: { locale: 'en', strength: 2 } })

			if (!word) {
				return res.status(400).json({ word: 'Word does not exist' })
			}

			await Word.findByIdAndDelete(word.id)

			res.status(200).json({ message: 'Success' })
		}
		catch (err) {
			console.log(err)
			res.sendStatus(500)
		}
	}
)

// retrieves unapproved words
router.get(
	'/unapproved',
	checkIsMod,
	async (req: Request, res: Response) => {
		try {
			const words = await Word
				.find({ approved: false })
				.sort('createdAt')
				.populate('createdBy', 'name')
				.select('word rhymesWith definition difficulty createdAt')
				.limit(20)

			res.status(200).json(words)
		}
		catch (err) {
			res.sendStatus(500)
		}
	}
)

export default router
