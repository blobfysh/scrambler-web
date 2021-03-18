import { User } from '../types/User'
import { model, Schema } from 'mongoose'

const schema = new Schema({
	name: {
		type: String,
		required: true,
		index: {
			unique: true,
			// collation allows finding names with case insensitivity (https://docs.mongodb.com/manual/core/index-case-insensitive/#create-a-case-insensitive-index)
			collation: { locale: 'en', strength: 2 }
		}
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		default: 'regular'
	}
}, { timestamps: true })

export default model<User>('user', schema)
