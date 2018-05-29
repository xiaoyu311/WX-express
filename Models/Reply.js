import mongoose from 'mongoose';
import replySchema from '../Schema/reply';

const Reply = mongoose.model('Reply', replySchema);

export default Reply;