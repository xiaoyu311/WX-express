import express from 'express';
import config from './config';
import db from './connect';
import router from './router';

const app = express();
const port = config.port;

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.Origin || req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", '3.2.1')
  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

router(app);

const server = app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`服务正在${server.address().port}端口启动`);
  }
});