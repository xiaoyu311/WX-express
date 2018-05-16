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
    const { author_id, loginname } = req.session;
    if (author_id) {
      const { tab, content, title } = req.body;
      let article_id = await this.IdComputed('article_id');
      async.mapLimit(
        [
          async () => {
            console.log(article_id)
            let newArticle = { author_id, article_id, tab, content, title, author: { loginname } };
            await ArticleModel.create(newArticle);
          },
          async () => {
            let articleInfo = {
              article_id,
              title,
              author: {
                loginname,
                avatar_url: 'https://avatars1.githubusercontent.com/u/1147375?v=4&s=120'
              },
              last_reply_at: ''
            };
            let User = await UserModel.findOne({ author_id });
            User.recent_topics.unshift(articleInfo);
            await User.save();
          }
        ],
        2,
        async (item, callback) => {
          await item();
          await callback();
        },
        (err, result) => {
          if (err) {
            throw new Error('文章添加失败');
            res.send(this.Success(0, '发表添加失败'));
            return;
          }
          res.send(this.Success(1, '发表添加成功'));
        });



      // newArticle.author.loginname = loginname;

    } else {
      res.send(this.Success(0, '未登录'));
    }
    return;
  }
  // 文章列表
  async article_list(req, res, next) {
    // console.log(async)
    // console.log(req.session.user_id);
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
  // 添加收藏文章
  async collection(req, res, next) {
  }
}

export default new Article();