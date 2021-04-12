import { Router, Request, Response } from 'express'
import Joi from 'joi'
import validate from '../../middleware/validate'
import { checkLoggedIn, checkIsMod } from '../../middleware/auth'
import Word from '../../models/Word'

const router = Router()

const wordSchema = Joi.object({
	word: Joi.string().min(4).max(30).regex(/^[A-Za-z]+$/).required()
		.label('Word')
		.messages({
			'string.min': 'Word must be at least 4 characters long',
			'string.pattern.base': 'Words only support alphanumeric characters'
		}),
	difficulty: Joi.string().valid('easy', 'medium', 'hard').required(),
	rhymesWith: Joi.array().items(Joi.string().required()).min(2).max(3).required()
		.messages({
			'array.min': 'You must enter at least 2 words that rhyme',
			'array.max': 'You can enter up to 3 words that rhyme'
		}),
	definition: Joi.string().max(150).required()
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
