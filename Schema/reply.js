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
  has_read: {
    type: Boolean,
    default: false
  },
  Reply_id: {
    type: String,
    default: null
  }, // 回复某条评论id
});

export default replySchema;