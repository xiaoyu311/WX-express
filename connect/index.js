'use strict';

import mongoose from 'mongoose';
import chalk from 'chalk';
import config from '../config';

mongoose.connect(config.mongodbUrl);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', () => {
  console.error(
    chalk.red('数据库连接出错...')
  );
});
db.once('open', () => {
  console.log(
    chalk.green('WX 数据库连接成功')
  );
});
db.on('close', () => {
  console.log(
    chalk.red('数据库断开，重新连接数据库')
  );
  mongoose.connect(config.url);
});

export default db;