import express from 'express';
const router = express.Router();
import article_add from '../controller/article_add';

router.get('/article_add', article_add);


export default router;