import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  author_id: String, // 作者id
  loginname: String, // 作者名字
  password: String,
  avatar_url: {
    type: String, // 头像地址
    default: 'https://avatars3.githubusercontent.com/u/8339316?v=4&s=120'
  },
  create_at: {
    type: String,
    default: new Date().getTime()
  }, // 创建时间
  recent_replies: {
    type: Array,
    default: []
  }, // 回复的话题
  recent_topics: {
    type: Array,
    default: []
  }, // 发表的话题
});

export default UserSchema;