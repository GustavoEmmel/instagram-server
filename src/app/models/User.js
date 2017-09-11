import mongoose, { Schema } from 'mongoose';

var UserSchema = new Schema({
  _id: {
    alias: 'name',
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.options.toJSON = {};
UserSchema.options.toJSON.transform = function (doc, ret, options) {
  ret.name = ret._id;
  delete ret.password;
};

export default mongoose.model('User', UserSchema);
