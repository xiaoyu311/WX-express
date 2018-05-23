export default {
  mongodb: {
    port: 8888,
    mongodbUrl: 'mongodb://127.0.0.1:27017/WX'
  },
  session: {
    name: 'xiaoyu',
    secret: 'xiaoyu18210670405',
    resave: false, //  //每次请求是否需要重新设置cookie
    saveUninitialized: false, // //无论是否有cookie,设置标记connect.sid可改名
    cookie: { maxAge: 30 * 60 * 1000 } // 过期时间（毫秒）
  }
};