import mongoose from 'mongoose';

const articleSchema = mongoose.Schema({
  article_id: String, // 文章id
  author_id: String, // 作者id
  tab: String, // 类型
  content: String, // 内容
  title: String, // 标题
  last_reply_at: {
    type: String,
    default: ''
  }, // 最后回复时间
  good: {
    type: Boolean,
    default: false
  }, // 精华是否
  top: {
    type: Boolean,
    default: false
  }, // 置顶是否
  reply_count: {
    type: String,
    default: 0
  }, // 回复数量
  visit_count: {
    type: String,
    default: 0
  }, // 点赞数量
  create_at: {
    type: String,
    default: new Date().getTime()
  }, // 创建时间
  author: {
    loginname: String, // 作者名字
    avatar_url: {
      type: String, // 头像地址
      default: 'https://avatars3.githubusercontent.com/u/8339316?v=4&s=120'
    }
  }
});
export default articleSchema;
