import BaseComponent from '../prototype/BaseComponent';
import ArticleModel from '../Models/Article';
import UserModel from '../Models/User';
import async from 'async';

class Article extends BaseComponent {
  constructor() {
    super()
    this.article_add = this.article_add.bind(this);
    this.article_list = this.article_list.bind(this);
    this.article_remove = this.article_remove.bind(this);
    this.collection = this.collection.bind(this);
  }
  // 添加文章
  async article_add(req, res, next) {
    const { user_id, loginname } = req.session;
    if (user_id) {
      const { tab, content, title } = req.body;
      let article_id = await this.IdComputed('article_id');
      let newArticle = { author_id: user_id, article_id, tab, content, title };
      ArticleModel.create(newArticle, err => {
        if (err) {
          throw new Error('文章添加失败');
          this.Fail(res); 
        }
        this.Success(res, 1, '发表添加成功');
      });
    } else {
      this.Success(res, 0, '未登录');
    }
  }
  // 文章列表
  async article_list(req, res, next) {
    let articleList = await ArticleModel.find();
    async.map(
      articleList,
      (articleInfo, callback) => {
        UserModel.findOne({ user_id: articleInfo.author_id }, (err, UserInfo) => {
          if (err) {
            callback('文章列表错误');
            this.Fail(res);
          }
          const { loginname, avatar_url } = UserInfo;
          const { article_id,
            author_id,
            tab,
            content,
            title,
            last_reply_at,
            good,
            top,
            reply_count,
            visit_count,
            create_at } = articleInfo;
          callback(null, {
            article_id,
            author_id,
            tab,
            content,
            title,
            last_reply_at,
            good,
            top,
            reply_count,
            visit_count,
            create_at,
            author: {
              loginname,
              avatar_url
            }
          });
        });
      },
      (err, results) => {
        if (err) {
          throw new Error(err);
          this.Fail(res);
        }
        this.Success(res, 1, '文章列表', results);
      }
    );
  }
  //文章删除
  async article_remove(req, res, next) {
    let article_id = req.body.article_id;
    await ArticleModel.deleteOne({ article_id });
    let articleList = await ArticleModel.find();
    res.send(this.Success(1, '删除成功', articleList));
    return;
  }
  // 添加收藏文章
  async collection(req, res, next) {
  }
}

export default new Article();