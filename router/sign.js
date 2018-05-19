import express from 'express';
import Sign from '../controller/Sign';
const router = express.Router();

router.post('/signup', Sign.signup); // 注册登录

export default router;