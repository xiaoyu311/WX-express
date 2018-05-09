import mongoose from 'mongoose';
import articleSchema from '../Schema/article';

const Article = mongoose.model('Article', articleSchema);

export default Article;

