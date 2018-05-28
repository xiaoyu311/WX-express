import mongoose from 'mongoose';

const collectSchema = mongoose.Schema({
  user_id: String, // 登录用户id
  article_id: String,  // 文章id
  creat_at: {
    type: String,
    default: Date.now()
  }
});

export default collectSchema;