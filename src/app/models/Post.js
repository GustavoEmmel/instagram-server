import mongoose, {Schema} from 'mongoose';

var PostSchema = new Schema({
	user: {
		type: String,
		ref: 'User',
		required: true
	},
	image: {
		type: Schema.Types.ObjectId,
		ref: 'File',
		required: true
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
