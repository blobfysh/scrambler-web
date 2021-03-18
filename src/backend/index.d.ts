import { User } from './types/User'

declare module 'express-session' {
	interface SessionData {
		user?: Pick<User, '_id'>
	}
}
