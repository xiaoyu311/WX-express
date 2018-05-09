import BaseComponent from '../prototype/BaseComponent';
import ArticleModel from '../Models/Article';

class Article extends BaseComponent {
  constructor() { 
    super()
    this.article_add = this.article_add.bind(this);
  }
  async article_add(req, res, next) {
    let article_id = await this.IdComputed('article_id');
    const { title, type, content } = req.body;
    await ArticleModel.create({ article_id, title, type, content });
    res.send({ status: 1, message: '文章添加成功' });
  }
}

export default new Article();