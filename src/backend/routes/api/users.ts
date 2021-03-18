import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import User from '../../models/User'
import Joi from 'joi'
import validate from '../../middleware/validate'
import { checkIsAdmin, checkLoggedOut } from '../../middleware/auth'

const router = Router()

const registerSchema = Joi.object({
	name: Joi.string().min(6).max(30).regex(/^[\w]+$/).required()
		.label('Username')
		.messages({ 'string.pattern.base': 'Usernames only support alphanumeric characters and numbers' }),
	password: Joi.string().required().min(6).max(30).label('Password'),
	passwordConfirmation: Joi.string().equal(Joi.ref('password')).required().label('Confirm password')
		.messages({ 'any.only': 'Passwords must match' })
})

router.post(
	'/register',
	checkLoggedOut,
	// use validation middleware to validate req.body against Joi schema
	validate(registerSchema, 'body'),
	async (req: Request, res: Response) => {
		try {
			const user = await User.findOne({ name: req.body.name }, null, { collation: { locale: 'en', strength: 2 } })

			if (user) {
				return res.status(400).json({ name: 'User already exists' })
			}

			const newUser = new User({
				name: req.body.name
			})

			// hash password
			const salt = await bcrypt.genSalt(10)
			const hash = await bcrypt.hash(req.body.password, salt)

			newUser.password = hash

			// save user to database
			const savedUser = await newUser.save()

			res.status(200).json(savedUser)
		}
		catch (err) {
			res.sendStatus(500)
		}
	}
)

const loginSchema = Joi.object({
	name: Joi.string().required().label('Username'),
	password: Joi.string().required().label('Password')
})

router.post(
	'/login',
	checkLoggedOut,
	validate(loginSchema, 'body'),
	async (req: Request, res: Response) => {
		try {
			// find user by username
			const user = await User.findOne({ name: req.body.name }, null, { collation: { locale: 'en', strength: 2 } })

			if (!user) {
				return res.status(404).json({ name: 'User not found' })
			}

			const isMatch = await bcrypt.compare(req.body.password, user.password)

			if (!isMatch) {
				return res.status(400).json({ password: 'Password incorrect' })
			}

			// password matched, create session
			req.session.user = {
				_id: user._id
			}

			return res.status(200).json({
				success: true,
				message: 'Successfully logged in'
			})
		}
		catch (err) {
			res.sendStatus(500)
		}
	}
)

router.get('/me', async (req: Request, res: Response) => {
	try {
		const { user } = req.session

		if (!user) {
			return res.status(200).json(null)
		}

		const dbUser = await User.findById(user._id).select('-password')

		res.status(200).json(dbUser)
	}
	catch (err) {
		res.sendStatus(500)
	}
})

router.get('/logout', (req: Request, res: Response) => {
	req.session.destroy(() => {
		res.redirect('/login')
	})
})

// user params schema used by patch /:name and delete /:name
const userModifyParamsSchema = Joi.object({
	name: Joi.string().required().label('Username')
})
const userModifyBodySchema = Joi.object({
	role: Joi.string().valid('regular', 'mod', 'admin').label('Role'),
	name: Joi.string().min(6).max(30).regex(/^[\w]+$/)
		.label('Username')
		.messages({ 'string.pattern.base': 'Usernames only support alphanumeric characters and numbers' })
})
// used by admins to change role of user
router.patch(
	'/:name',
	checkIsAdmin,
	// use validation middleware to validate req.params against Joi schema
	validate(userModifyParamsSchema, 'params'),
	validate(userModifyBodySchema, 'body'),
	async (req: Request, res: Response) => {
		try {
			// find user by username
			const user = await User.findOne({ name: req.params.name }, null, { collation: { locale: 'en', strength: 2 } })

			if (!user) {
				return res.status(404).json({ name: 'User not found' })
			}

			if (req.body.role) {
				user.role = req.body.role
			}
			if (req.body.name) {
				user.name = req.body.name
			}

			const updatedUser = await user.save()

			res.status(200).json(updatedUser)
		}
		catch (err) {
			console.log(err)
			res.sendStatus(500)
		}
	}
)

// used by admins to delete user
router.delete(
	'/:name',
	checkIsAdmin,
	// use validation middleware to validate req.params against Joi schema
	validate(userModifyParamsSchema, 'params'),
	async (req: Request, res: Response) => {
		try {
			// find user by username
			const user = await User.findOne({ name: req.params.name }, null, { collation: { locale: 'en', strength: 2 } })

			if (!user) {
				return res.status(404).json({ name: 'User not found' })
			}

			await User.findByIdAndDelete(user.id)

			res.status(200).json({ message: 'Success' })
		}
		catch (err) {
			console.log(err)
			res.sendStatus(500)
		}
	}
)

export default router
