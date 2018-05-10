import mongoose from 'mongoose';
import UserSchema from '../Schema/user';

const User = mongoose.model('User', UserSchema);

export default User;