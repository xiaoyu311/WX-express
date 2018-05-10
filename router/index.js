import express from 'express';
import article from './article';
import sign from './sign';

// 所有路由
export default app => {
  app.use('/article', article);
  app.use('/sign', sign);
}