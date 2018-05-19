import express from 'express';
import User from '../controller/User'; 

const router = express.Router();

router.get('/info', User.info); // 用户信息

export default router;