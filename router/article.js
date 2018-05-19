import express from 'express';
const router = express.Router();
import Article from '../controller/Article';

// article路由下的所有子路由
router.post('/article_add', Article.article_add); // 文章添加
router.get('/article_list', Article.article_list); // 文章列表
router.post('/article_remove', Article.article_remove); // 文章删除
router.get('/collection', Article.collection); // 文章收藏

export default router;