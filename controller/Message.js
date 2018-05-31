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

  async not_has_read(req, res) {
    const {
      user_id
    } = req.session;
    if (!user_id) {
      this.Success(res, 0, '未登录');
      return;
    }
    try {
      let userArticle = await ArticleModel.find({
        author_id: user_id
      })
      async.map(
        userArticle,
        async (userArticleInfo, callback) => {
          try {
            // 一篇文章下的评论
            let ArticleReply = await ReplyModel.find({
              article_id: userArticleInfo.article_id,
              Reply_id: null
            });
            await callback(null, ArticleReply);
          } catch (err) {
            throw new Error('文章下的评论');
            this.Fail(res);
            return;
          }
        },
        async (err, result) => {
          if (err) {
            throw new Error('查询评论失败');
            this.Fail(res);
            return;
          }
          // 文章下的评论
          let replyList = [];
          result.forEach(item => {
            if (item.length) {
              item.forEach(value => {
                replyList.push(value)
              });
            }
          });
          try {
            // 当前用户的所有评论
            let UserReply = await ReplyModel.find({ user_id });
            let allReply = await ReplyModel.find();
            // 所有是回复的评论
            let AllReply = allReply.filter(item => item.Reply_id != null);
            let obj = {};
            // 被回复的评论
            let repliedList = [];
            UserReply.forEach(item => { 
              AllReply.forEach(value => {
                if (item.reply_id == value.Reply_id) {
                  repliedList.push(value);
                }
              });
            });
            this.Success(res, 1, '未读消息', [...replyList, ...repliedList]);
            return;
          } catch (err) {
            throw new Error('用户评论查询失败');
            this.Fail(res);
            return;
          }
        }
      );
    } catch (err) {
      throw new Error('文章列表查询失败');
      this.Fail(res);
      return;
    }
  }
}

export default new Message();