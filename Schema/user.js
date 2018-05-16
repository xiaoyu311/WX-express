import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  author_id: String, // 作者id
  loginname: String, // 作者名字
  password: String,
  avatar_url: {
    type: String, // 头像地址
    default: 'https://avatars3.githubusercontent.com/u/8339316?v=4&s=120'
  },
  // 创建时间
  create_at: {
    type: String,
    default: new Date().getTime()
  }, 
  // 回复的话题
  recent_replies: {
    type: Array,
    default: []
  },
      // {
      //   author_id: String,
      //   author: {
      //     loginname: String,
      //     avatar_url: {
      //       type: String,
      //       default: 'https://avatars1.githubusercontent.com/u/1147375?v=4&s=120'
      //     }
      //   },
      //   title: String,
      //   // 最后回复时间
      //   last_reply_at: {
      //     type: String,
      //     default: ''
      //   }
      // }
  // 发表的话题
  recent_topics: {
    type: Array,
    default: []
  } 
  // {
  //   article_id: String,
  //   author: {
  //     loginname: String,
  //     avatar_url: {
  //       type: String,
  //       default: 'https://avatars1.githubusercontent.com/u/1147375?v=4&s=120'
  //     }
  //   },
  //   title: String,
  //   // 最后回复时间
  //   last_reply_at: {
  //     type: String,
  //     default: ''
  //   }
  // }
});

export default UserSchema;