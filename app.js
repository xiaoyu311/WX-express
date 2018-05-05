import express from 'express';
import config from './config';

const app = express();
const port = config.port;

app.get('/', (req, res) => {
  res.send('ddd')
});

app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`服务正在${config.port}端口启动`)
  }
});