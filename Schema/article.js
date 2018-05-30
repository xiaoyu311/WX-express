import mongoose from 'mongoose';

const articleSchema = mongoose.Schema({
  article_id: String, // 文章id
  author_id: String, // 作者id
  tab: String, // 类型
  content: String, // 内容
  title: String, // 标题
  good: {
    type: Boolean,
    default: true
  }, // 精华是否
  top: {
    type: Boolean,
    default: true
  }, // 置顶是否
  create_at: {
    type: Date,
    default: Date.now
  }, // 创建时间
  last_reply_at: {
    type: Date,
    default: Date.now
  }
});
export default articleSchema;
