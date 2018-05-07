import express from 'express';
import config from './config';
import db from './connect';
import articleSchema from './Schema/article';
console.log(articleSchema)

const app = express();
const port = config.port;

app.get('/', (req, res) => {
  res.send(JSON.stringify(app))
});

const server = app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`服务正在${server.address().port}端口启动`);
  }
});