import express from 'express';
import Reply from '../controller/Reply';

const router = express.Router();

router.post('/article/:article_id/replies', Reply.replies); // 评论
router.get('/article/:article_id/reply_list', Reply.reply_list); // 评论列表

export default router;