import BaseComponent from '../prototype/BaseComponent';
import ArticleModel from '../Models/Article';

class Article extends BaseComponent {
  constructor() { 
    super()
    this.article_add = this.article_add.bind(this);
    this.article_list = this.article_list.bind(this);
  }
  // 添加文章
  async article_add(req, res, next) {
    let article_id = await this.IdComputed('article_id');
    const { title, type, content } = req.body;
    await ArticleModel.create({ article_id, title, type, content });
    res.send(this.Success(1, '文章添加成功'));
    return;
  }
  // 文章列表
  async article_list(req, res, next) {
    let articleList = await ArticleModel.find();
    res.send(this.Success(1, '文章列表', articleList));
  }
}

export default new Article();