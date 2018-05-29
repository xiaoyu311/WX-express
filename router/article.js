import express from 'express';
const router = express.Router();
import Article from '../controller/Article';

// article路由下的所有子路由
router.post('/article_add', Article.article_add); // 文章添加
router.get('/article_list', Article.article_list); // 文章列表
router.post('/article_update', Article.article_update); // 文章更新
router.get('/article_info/:article_id', Article.article_info);
router.post('/article_remove', Article.article_remove); // 文章删除
router.post('/collection', Article.collection); // 文章收藏
router.get('/collection_list', Article.collection_list); // 文章收藏列表
router.get('/clear', Article.clear); // 文章清空

export default router;