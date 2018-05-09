import express from 'express';
const router = express.Router();
import Article from '../controller/Article';

router.post('/article_add', Article.article_add);

export default router;