import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  user_id: Number,
  username: String,
  password: String
});

export default UserSchema;