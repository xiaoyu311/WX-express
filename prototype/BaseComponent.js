import Ids from '../Models/Ids';
import moment from 'moment';
export default class BaseComponent {
  constructor() {
    this.idList = ['author_id', 'article_id', 'user_id', 'reply_id'];
  }
  // 计算id 避免id重复
  async IdComputed(type) {
    if (!this.idList.includes(type)) {
      console.log('id类型错误');
      throw new Error('id类型错误');
      return;
    }
    const idData = await Ids.findOne();
    idData[type]++;
    await idData.save();
    return idData[type];
  }
  // 程序出错调用方法
  Fail(res) {
    res.sendStatus(500);
    return;
  }
  // 返回成功模板
  Success(res, status, message, data) {
    let sendData = { status, message };
    if (data) {
      sendData.data = data;
    }
    res.send(sendData);
    return;
  }
  // 时间戳转换
  formatTime(date) {
    date = moment(date);
    return date.fromNow();
  }
  // 集合清空
  Clear(Model) {
    Model.remove();
    return;
  }
}