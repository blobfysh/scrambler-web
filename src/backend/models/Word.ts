import { Word } from '../types/Word'
import { model, Schema } from 'mongoose'

const schema = new Schema({
	word: {
		type: String,
		required: true,
		index: {
			unique: true,
			// collation allows finding words with case insensitivity (https://docs.mongodb.com/manual/core/index-case-insensitive/#create-a-case-insensitive-index)
			collation: { locale: 'en', strength: 2 }
		}
	},
	difficulty: {
		type: String,
		required: true
	},
	rhymesWith: {
		type: [{
			type: String,
			lowercase: true
		}],
		required: true
	},
	definition: {
		type: String,
		required: true,
		lowercase: true
	},
	approved: {
		type: Boolean,
		required: true,
		default: false
	},
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: 'user',
		required: true
	}
}, { timestamps: true })

export default model<Word>('word', schema)
