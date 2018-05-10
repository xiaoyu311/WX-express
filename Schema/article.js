import mongoose from 'mongoose';

const articleSchema = mongoose.Schema({
  article_id: Number,
  user_id: Number,
  username: String,
  title: String,
  type: Array,
  content: String
});
export default articleSchema;
