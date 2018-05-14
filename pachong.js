import superagent from 'superagent';
import cheerio from 'cheerio';

let that = this;
superagent.get('https://cnodejs.org/').end((err, sres) => {
  if (err) {
    throw new Error('superagent');
    res.send({ status: 0, message: 'oen', one: sres });
  }
  const $ = cheerio.load(sres.text);
  $('#topic_list .cell').each(async function (index, element) {
    let obj = {};
    let article_id = Math.random();
    let user_id = Math.random();
    obj.article_id = article_id;
    obj.user_id = user_id;
    obj.username = $(this).find('.user_avatar').find('img').attr('title');
    obj.title = $(this).find('.topic_title').attr('title');
    obj.type = $(this).find('.topiclist-tab').text();
    obj.content = $(this).find('.topic_title').attr('title');
    obj.visit_count = $(this).find('.count_of_visits').text();
    obj.reply_count = $(this).find('.count_of_replies').text();
    obj.last_reply_at = $(this).find('.last_active_time').text();
    obj.top = ($(this).find('.put_top').text()) ? true : false;
    obj.avatar_url = $(this).find('.user_avatar').find('img').attr('src');
    obj.last_reply_url = $(this).find('.user_small_avatar').attr('src');
    await ArticleModel.create(obj);
  });
  res.send({ status: 1, message: 'oen', one: [] });
})