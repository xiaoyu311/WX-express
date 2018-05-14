import mongoose from 'mongoose';

const articleSchema = mongoose.Schema({
  article_id: String, // 文章id
  user_id: String, // 作者id
  username: String, // 作者
  title: String, // 标题
  type: Array, // 类型
  content: String, // 内容
  visit_count: String, // 关注量
  reply_count: String, // 回复量
  last_reply_at: String, // 最后恢复时间
  top: Boolean, // 知否置顶
  avatar_url: String, // 作者图标
  last_reply_url: String // 回复人图标
});
export default articleSchema;
