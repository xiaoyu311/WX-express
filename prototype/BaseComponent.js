import Ids from '../Models/Ids';
export default class BaseComponent {
  constructor() {
    this.idList = ['user_id', 'article_id'];
  }
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
}