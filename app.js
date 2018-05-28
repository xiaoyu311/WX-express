import express from 'express';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import cookieParser from 'cookie-parser';
// 解析请求体
import bodyParser from 'body-parser';
import config from './config';
import db from './connect';
import router from './router';
import moment from 'moment';

moment.locale('zh-cn'); // 使用中文

const app = express();
const port = config.mongodb.port;
const mongodbUrl = config.mongodb.mongodbUrl;

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.Origin || req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", '3.2.1')
  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    // console.log(req.header)
    next();
  }
});

const MongoStore = connectMongo(session);

app.use(bodyParser());
app.use(cookieParser());

app.use(session({
  ...config.session,
  store: new MongoStore({
    url: mongodbUrl,
  })
}));

router(app);

const server = app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`服务正在${server.address().port}端口启动`);
  }
});