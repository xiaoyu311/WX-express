import mongoose from 'mongoose';

const articleSchema = mongoose.Schema({
  article_id: Number,
  type: String,
  title: String,
  content: String
}, {
  _id: false
});
export default articleSchema;
