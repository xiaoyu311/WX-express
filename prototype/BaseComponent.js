import Ids from '../Models/Ids';
export default class BaseComponent {
  constructor() {
    this.idList = ['user_id', 'article_id'];
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
  // 返回成功模板
  Success(status, message, data) {
    let sendData = { status, message };
    if (data) {
      sendData.data = data;
    }
    return sendData;
  }
}