import BaseComponent from '../prototype/BaseComponent';
import ArticleModel from '../Models/Article';
import UserModel from '../Models/User';
import CollectModel from '../Models/Collect';
import ReplyModel from '../Models/Reply';
import async from 'async';

class Article extends BaseComponent {
  constructor() {
    super()
    this.article_add = this.article_add.bind(this);
    this.article_list = this.article_list.bind(this);
    this.article_update = this.article_update.bind(this);
    this.article_info = this.article_info.bind(this);
    this.article_remove = this.article_remove.bind(this);
    this.collection = this.collection.bind(this);
    this.collection_list = this.collection_list.bind(this);
    this.clear = this.clear.bind(this);
  }
  // 添加文章
  async article_add(req, res, next) {
    // console.log(req.sessionID);
    const {
      user_id,
      loginname
    } = req.session;
    // console.log(req.session)
    if (user_id) {
      const {
        tab,
        content,
        title
      } = req.body;
      let article_id = await this.IdComputed('article_id');
      let newArticle = {
        author_id: user_id,
        article_id,
        tab,
        content,
        title
      };
      ArticleModel.create(newArticle, err => {
        if (err) {
          throw new Error('文章添加失败');
          this.Fail(res);
          return;
        }
        this.Success(res, 1, '发表添加成功');
        return;
      });
    } else {
      this.Success(res, 0, '未登录');
      return;
    }
  }
  // 文章列表
  async article_list(req, res, next) {
    // console.log(req.sessionID);
    let articleList = await ArticleModel.find();
    async.map(
      articleList,
      (articleInfo, callback) => {
        UserModel.findOne({
          user_id: articleInfo.author_id
        }, (err, UserInfo) => {
          if (err) {
            callback('文章列表错误');
            this.Fail(res);
            return;
          }
          CollectModel.findOne({
            user_id: req.session.user_id,
            article_id: articleInfo.article_id
          }, (err, collectInfo) => {
            let collected = false;
            if (err) {
              callback('文章收藏错误');
              this.Fail(res);
              return;
            }
            if (collectInfo) {
              collected = true;
            }
            const {
              loginname,
              avatar_url
            } = UserInfo;
            const {
              article_id,
              author_id,
              tab,
              content,
              title,
              good,
              top,
              last_reply_at,
              create_at
            } = articleInfo;
            let newCreate_at = this.formatTime(create_at);
            ReplyModel.find({article_id: articleInfo.article_id}, (err, ReplyMany) => {
              if (err) {
                throw new Error('评论数量查询出错');
                this.Fail(res);
                return;
              }
              let reply_count = ReplyMany.length;
              CollectModel.find({article_id: articleInfo.article_id}, (err, Collect) => {
                if (err) {
                  throw new Error('点赞数量查询出错');
                  this.Fail(res);
                  return;
                }
                let visit_count = Collect.length;
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
                  create_at: newCreate_at,
                  collected,
                  author: {
                    loginname,
                    avatar_url
                  }
                });
              });
            });
          });
        });
      },
      (err, results) => {
        if (err) {
          throw new Error(err);
          this.Fail(res);
          return;
        }
        this.Success(res, 1, '文章列表', results);
        return;
      }
    );
  }
  // 文章更新
  article_update(req, res) {
    let user_id = req.session.user_id;
    if (!user_id) {
      this.Success(res, 0, '未登录');
      return;
    }
    let {
      article_id,
      title,
      type,
      content
    } = res.body;
    ArticleModel.update({
      article_id
    }, {
      title,
      type,
      content
    }, (err, result) => {
      if (err) {
        this.Fail(res);
        throw new Error('文章更新失败');
        return;
      }
      this.Success(res, 1, '更新成功');
    });
  }
  //文章删除
  article_remove(req, res, next) {
    let user_id = req.session.user_id;
    let article_id = req.body.article_id;
    async.each([
        async () => {
          await ArticleModel.deleteOne({
            article_id
          });
        },
        async () => {
          await CollectModel.deleteOne({
            user_id,
            article_id
          });
        }
      ],
      async (item, callback) => {
        await item();
        await callback();
      },
      err => {
        if (err) {
          this.Fail(res);
          return;
        }
        ArticleModel.find({}, (err, result) => {
          if (err) {
            this.Fail(res);
            return;
          }
          this.Success(res, 1, '删除成功', result);
          return;
        });
      }
    );
  }
  // 添加收藏文章
  async collection(req, res, next) {
    let user_id = req.session.user_id;
    if (user_id) {
      const {
        article_id
      } = req.body;
      try {
        let results = await CollectModel.findOne({
          user_id
        });
        if (results) {
          this.Success(res, 0, '文章已收藏');
          return;
        }
        await CollectModel.create({
          user_id,
          article_id
        });
        this.Success(res, 1, '收藏成功');
      } catch (err) {
        throw new Error('收藏失败');
        this.Fail(res);
        return;
      }
      // this.Success(res, 1, '收藏成功');
    } else {
      this.Success(res, 0, '未登录');
      return;
    }
  }
  // 展示收藏列表
  async collection_list(req, res) {
    try {
      let collectionList = await CollectModel.find();
      this.Success(res, 1, '收藏列表', collectionList);
      return;
    } catch (err) {
      this.Fail(res);
      throw new Error('收藏列表查看失败');
      return;
    }
  }

  // 文章详情
  article_info(req, res) {
    const {
      article_id
    } = req.params;
    ArticleModel.findOne({
      article_id
    }, (err, result) => {
      if (err) {
        throw new Error('文章信息查询失败');
        this.Fail(res);
        return;
      }
      const {
        article_id,
        author_id,
        tab,
        content,
        title,
        good,
        top,
        last_reply_at,
        create_at
      } = result;
      UserModel.findOne({
        user_id: author_id
      }, (err, userInfo) => {
        if (err) {
          throw new Error('用户信息查询失败');
          this.Fail(res);
          return;
        }
        const {
          loginname,
          avatar_url
        } = userInfo;
        CollectModel.findOne({
          user_id: req.session.user_id,
          article_id
        }, (err, collectInfo) => {
          let collected = false;
          if (err) {
            this.Fail(res);
            return;
          }
          if (collectInfo) {
            collected = true;
          }
          ReplyModel.count({}, (err, reply_count) => {
            if (err) {
              throw new Error('评论数量查询出错');
              this.Fail(res);
              return;
            }
            CollectModel.count({}, (err, visit_count) => {
              if (err) {
                throw new Error('点赞数量查询出错');
                this.Fail(res);
                return;
              }
              this.Success(res, 1, '文章信息', {
                article_id,
                author_id,
                tab,
                content,
                title,
                good,
                top,
                reply_count,
                visit_count,
                last_reply_at,
                create_at,
                collected,
                author: {
                  loginname,
                  avatar_url
                }
              });
              return;
            });
          });
        });
      });
    });
  }
  // 删除所有文章
  clear(req, res) {
    this.Clear(ArticleModel);
  }
}

export default new Article();