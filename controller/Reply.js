import BaseComponent from '../prototype/BaseComponent';
import ReplyModel from '../Models/Reply';
import UserModel from '../Models/User';
import async from 'async';

class Reply extends BaseComponent {
  constructor() {
    super()
    this.replies = this.replies.bind(this);
    this.reply_list = this.reply_list.bind(this);
  }

  // 评论
  async replies(req, res) {
    const {
      user_id
    } = req.session;
    if (!user_id) {
      this.Success(res, 0, '未登录');
      return;
    }
    const {
      article_id
    } = req.params;
    const {
      content,
      Reply_id
    } = req.body;
    let reply_id = await this.IdComputed('reply_id');
    const newReply = {
      reply_id,
      user_id,
      article_id,
      content,
      Reply_id
    };
    ReplyModel.create(newReply, err => {
      if (err) {
        throw new Error('创建评论失败');
        this.Fail(res);
        return;
      }
      ReplyModel.find({}, (err, replyList) => {
        if (err) {
          throw new Error('创建评论失败');
          this.Fail(res);
          return;
        }

        let filterList = replyList.map(item => {
          const {
            reply_id, // 评论id
            user_id, // 评论者id
            article_id, // 文章id
            content, // 评论主体
            create_at,
            ups,
            Reply_id
          } = item;
          let newCreate_at = this.formatTime(create_at);
          return {
            reply_id, // 评论id
            user_id, // 评论者id
            article_id, // 文章id
            content, // 评论主体
            create_at: newCreate_at,
            ups,
            Reply_id
          };
        });
        this.Success(res, 1, '评论成功', filterList);
      });
    });
  }
  // 评论列表
  reply_list(req, res) {
    const {
      article_id
    } = req.params;
    ReplyModel.find({
      article_id
    }, (err, replyList) => {
      if (err) {
        throw new Error('评论列表查询失败');
        this.Fail(res);
        return;
      }
<<<<<<< HEAD
      let filterList = replyList.map(item => {
        const {
          reply_id, // 评论id
          user_id, // 评论者id
          article_id, // 文章id
          content, // 评论主体
          create_at,
          ups,
          Reply_id
        } = item;
        let newCreate_at = this.formatTime(create_at);
        return {
          reply_id, // 评论id
          user_id, // 评论者id
          article_id, // 文章id
          content, // 评论主体
          create_at: newCreate_at,
          ups,
          Reply_id
        };
      });
      this.Success(res, 1, '评论列表查询成功', filterList);
=======
      async.map(
        replyList,
        (replyInfo, callback) => {
          UserModel.findOne({
            user_id: replyInfo.user_id
          }, (err, UserInfo) => {
            if (err) {
              callback('评论者id查询失败');
              this.Fail(res);
              return;
            }
            const {
              loginname,
              avatar_url
            } = UserInfo;
            const {
              reply_id, // 评论id
              user_id, // 评论者id
              article_id, // 文章id
              content, // 评论主体
              create_at,
              ups,
              Reply_id
            } = replyInfo;
            let newCreate_at = this.formatTime(create_at);
            callback(null, {
              reply_id, // 评论id
              user_id, // 评论者id
              article_id, // 文章id
              content, // 评论主体
              create_at: newCreate_at,
              ups,
              Reply_id,
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
            return;
          }
          this.Success(res, 1, '评论列表', results);
          return;
        }
      );
>>>>>>> 0657a5989832017171dbf405a6e6b3ead02672e4
    });
  }
}

export default new Reply();