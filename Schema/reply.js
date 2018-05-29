import mongoose from 'mongoose';

const replySchema = mongoose.Schema({
  reply_id: String, // 评论id
  user_id: String, // 评论者id
  article_id: String, // 文章id
  content: String, // 评论主体
  create_at: {
    type: Date,
    default: Date.now
  },
  ups: { // 点赞人集合
    type: Array,
    default: []
  },
});

export default replySchema;