import { Document } from 'mongoose'

type Role = 'regular' | 'mod' | 'admin'

export interface User extends Document {
	name: string
	password: string
	role: Role
}
