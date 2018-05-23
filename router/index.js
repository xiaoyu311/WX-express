import express from 'express';
import article from './article';
import sign from './sign';
import user from './user';

// 所有路由
export default app => {
  app.use('/article', article);
  app.use('/sign', sign);
  app.use('/user', user);
  app.get('/getcookie', (req, res) => { 
    req.session.set = req.sessionID;
    console.log(req.sessionID)
    res.send({ status: 1, message: '获取cookie成功' });
  });
}