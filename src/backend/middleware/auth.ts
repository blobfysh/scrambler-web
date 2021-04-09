import { Request, Response, NextFunction } from 'express'
import User from '../models/User'

/**
 * Middleware to make sure user is logged in
 * @param req
 * @param res
 * @param next
 */
function checkLoggedIn (req: Request, res: Response, next: NextFunction): void {
	const { user } = req.session

	if (!user) {
		res.redirect('/login')
	}
	else {
		next()
	}
}

/**
 * Middleware to make sure user is logged out
 * @param req
 * @param res
 * @param next
 */
function checkLoggedOut (req: Request, res: Response, next: NextFunction): void {
	const { user } = req.session

	if (!user) {
		next()
	}
	else {
		res.redirect('/')
	}
}

async function checkIsMod (req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const { user } = req.session

		if (!user) {
			res.sendStatus(401)
			return
		}

		const dbUser = await User.findById(user._id)

		if (!dbUser || !['mod', 'admin'].includes(dbUser.role)) {
			res.sendStatus(401)
		}
		else {
			next()
		}
	}
	catch (err) {
		res.sendStatus(500)
	}
}

async function checkIsAdmin (req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const { user } = req.session

		if (!user) {
			res.sendStatus(401)
			return
		}

		const dbUser = await User.findById(user._id)

		if (!dbUser || dbUser.role !== 'admin') {
			res.sendStatus(401)
		}
		else {
			next()
		}
	}
	catch (err) {
		res.sendStatus(500)
	}
}

export {
	checkLoggedIn,
	checkLoggedOut,
	checkIsMod,
	checkIsAdmin
}
