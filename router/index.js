import express from 'express';
import article from './article';

export default app => {
  app.use('/article', article);
}