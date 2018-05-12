export default {
  mongodb: {
    port: 8001,
    mongodbUrl: 'mongodb://127.0.0.1:27017/WX'
  },
  session: {
    name: 'xiaoyu',
    secret: 'xiaoyu18210670405',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 1000 } // 过期时间（毫秒）
  }
};