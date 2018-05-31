import express from 'express';
import Message from '../controller/Message';

const router = express.Router();

router.post('/has_read', Message.has_read); // 已读消息
router.get('/mark_all', Message.mark_all); // 全部标记已读
router.get('/not_has_read', Message.not_has_read); // 未读消息

export default router;