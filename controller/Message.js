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
    ArticleModel.find({
      author_id: user_id
    }, (err, myArticleList) => {
      if (err) {
        throw new Error('查询用户文章失败');
        this.Fail(res);
        return;
      }
      async.map(
        myArticleList,
        // 文章详情
        (myArticleInfo, callback) => {
          // console.log(myArticleInfo)
          ReplyModel.find({
            article_id: myArticleInfo.author_id,
            // has_read: false
            // 一条文章下的所有评论
          }, (err, ReplyList) => {
            // ReplyModel.find()
            // console.log(ReplyList);
            callback(null, ReplyList);
          })
        },
        (err, result) => {
          if (err) {
            throw new Error('查询评论失败');
            this.Fail(res);
            return;
          }
          let replyList = [];
          result.forEach(item => {
            if (item.length) {
              item.forEach(value => {
                replyList.push(value)
              });
            }
          });
          ReplyModel.find({}, (err, AllReplyList) => {
            if (err) {
              throw new Error('查询评论失败');
              this.Fail(res);
              return;
            }
            let ReplyList = [];
            AllReplyList.forEach(item => {
              AllReplyList.forEach(value => {
                if (item.reply_id == value.Reply_id) {
                  ReplyList.push(value);
                }
              })
            });
            let obj = {};
            let uniqueList = [...replyList, ...ReplyList].filter(item => {
              return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true);
            })
            this.Success(res, 1, '未读消息', uniqueList)
          });
        }
      );
    });
  }
}

export default new Message();