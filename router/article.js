import express from 'express';
const router = express.Router();
import Article from '../controller/Article';

router.get('/article_add', Article.article_add);

export default router;