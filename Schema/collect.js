import mongoose from 'mongoose';

const collectSchema = mongoose.Schema({
  user_id: String,
  article_id: String, 
  creat_at: {
    type: String,
    default: new Date().getTime()
  }
});

export default collectSchema;