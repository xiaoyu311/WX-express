import express from 'express';
import article from './article';

// 所有路由
export default app => {
  app.use('/article', article);
}