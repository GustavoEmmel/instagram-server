import mongoose, {Schema} from 'mongoose';

var PostSchema = new Schema({
	user: {
		type: String,
		ref: 'User'
	},
	image: {
		type: Schema.Types.ObjectId,
		ref: 'File'
	},
	message: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

export default mongoose.model('Post', PostSchema);
