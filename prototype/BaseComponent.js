import Ids from '../Models/Ids';
export default class BaseComponent {
  constructor() {
    this.idList = ['author_id', 'article_id', 'user_id'];
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
  formatTime(time) {
    let LTMinute = 1000 * 60; // 小于一分钟
    let LTHuor = 1000 * 60 * 60; // 小于一小时
    let LTDay = 1000 * 60 * 60 * 24; // 小于一天
    let LTMonth = 1000 * 60 * 60 * 24 * 30; // 小于一个月
    let LTYear = 1000 * 60 * 60 * 24 * 30 * 12; // 小于一年
    let currentTime = new Date().getTime();
    time = parseInt(time);
    let Difference = currentTime - time;
    console.log(currentTime)
    if (Difference <= LTMinute) {
      return '刚刚';
    }
    if (Difference > LTMinute && Difference <= LTHuor) {
      return Math.floor(Difference / LTMinute) + '分钟前';
    }
    if (Difference > LTHuor && Difference <= LTDay) {
      return Math.floor(Difference / LTHuor) + '小时前';
    }
    if (Difference > LTDay && Difference <= LTMonth) {
      return Math.floor(Difference / LTDay) + '天前';
    }
    if (Difference > LTMonth && Difference <= LTYear) {
      return Math.floor(Difference / LTMonth) + '月前';
    }
    if (Difference > LTYear) {
      return Math.floor(Difference / LTYear) + '年前';
    }
  }
  // 集合清空
  Clear(Model) {
    Model.remove();
    return;
  }
}