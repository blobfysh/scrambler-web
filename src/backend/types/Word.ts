import { Document } from 'mongoose'
import { User } from './User'

type Difficulty = 'easy' | 'medium' | 'hard'

export interface Word extends Document {
	word: string
	difficulty: Difficulty
	definition: string
	rhymesWith: string[]
	approved: boolean
	createdBy: User
}
