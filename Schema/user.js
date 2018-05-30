import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  user_id: String, // 作者id
  loginname: String, // 作者名字
  password: String,
  avatar_url: {
    type: String, // 头像地址
    default: 'https://avatars3.githubusercontent.com/u/8339316?v=4&s=120'
  },
  // 创建时间
  create_at: {
    type: Date,
    default: Date.now
  },
});

export default UserSchema;