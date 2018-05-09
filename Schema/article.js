import mongoose from 'mongoose';

const articleSchema = mongoose.Schema({
  article_id: Number,
  title: String,
  type: Array,
  content: String
});
export default articleSchema;
