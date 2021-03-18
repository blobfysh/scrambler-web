import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'

interface Errors {
	[key: string]: string
}

// middleware used to validate Joi schemas, will respond with errors if schema fails to validate
export default (schema: Joi.Schema, type: 'body' | 'query' | 'params') => (req: Request, res: Response, next: NextFunction): void => {
	const { error } = schema.validate(req[type], {
		// sending all errors allows me to display them in forms
		abortEarly: false
	})

	if (!error) {
		next()
	}
	else {
		const { details } = error
		console.log(details)

		// custom formatting for errors, using reduce to create an object
		const formattedErrors = details.reduce<Errors>((prev, curr) => {
			if (curr.context && curr.context.key) {
				return {
					...prev,
					[curr.context.key]: curr.message
				}
			}

			return prev
		}, {})

		res.status(400).json(formattedErrors)
	}
}
