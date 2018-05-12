import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  user_id: Number,
  username: String,
  password: String,
  collections: Array,
});

export default UserSchema;