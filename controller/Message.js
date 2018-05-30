import BaseComponent from '../prototype/BaseComponent';
import ReplyModel from '../Models/Reply';
import UserModel from '../Models/User';
import ArticleModel from '../Models/Article';
import async from 'async';

class Message extends BaseComponent {
  constructor() {
    super()
    this.has_read = this.has_read.bind(this);
    this.not_has_read = this.not_has_read.bind(this);
  }

  has_read(req, res) {}

  not_has_read(req, res) {
    const {
      user_id
    } = req.session;
    // 获取所有登录用户的所有文章
    ArticleModel.find({
      author_id: user_id
    }, (err, myArticleList) => {
      async.map(
        myArticleList,
        // 文章详情
        (myArticleInfo, callback) => {
          ReplyModel.find({
            article_id: myArticleInfo.article_id,
            has_read: false
            // 一条文章下的所有评论
          }, (err, ReplyList) => {
            callback(null, ReplyList);
          })
        },
        (err, result) => {
          res.send({ status: 1, message: 'sdd', data: result });
        }
      );
    });
  }
}

export default new Message();