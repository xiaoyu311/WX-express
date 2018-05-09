import express from 'express';
const router = express.Router();
import Article from '../controller/Article';

// article路由下的所有子路由
router.post('/article_add', Article.article_add);
router.get('/article_list', Article.article_list);

export default router;