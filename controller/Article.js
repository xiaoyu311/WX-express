import BaseComponent from '../prototype/BaseComponent';
import ArticleModel from '../Models/Article';

class Article extends BaseComponent {
  constructor() { 
    super()
    this.article_add = this.article_add.bind(this);
    this.article_list = this.article_list.bind(this);
    this.article_remove = this.article_remove.bind(this);
  }
  // 添加文章
  async article_add(req, res, next) {
    if (req.session.user_id) {
      let article_id = await this.IdComputed('article_id');
      const { title, type, content } = req.body;
      await ArticleModel.create({
        article_id,
        user_id: req.session.user_id,
        username: req.session.username,
        title,
        type,
        content
      });
      res.send(this.Success(1, '文章添加成功'));
    } else {
      res.send(this.Success(0, '未登录'));
    }
    return;
  }
  // 文章列表
  async article_list(req, res, next) {
    console.log(req.session.user_id);
    let articleList = await ArticleModel.find();
    res.send(this.Success(1, '文章列表', articleList));
    return;
  }
  //文章删除
  async article_remove(req, res, next) {
    let article_id = req.body.article_id;
    await ArticleModel.deleteOne({ article_id });
    let articleList = await ArticleModel.find();
    res.send(this.Success(1, '删除成功', articleList));
    return;
  }
}

export default new Article();