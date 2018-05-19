import BaseComponent from '../prototype/BaseComponent';
import UserModel from '../Models/User';

class User extends BaseComponent {
  constructor() {
    super()
    this.info = this.info.bind(this);
  }
  // 查看用户信息
  async info(req, res, next) {
    try {
      let UserList = await UserModel.find();
      this.Success(res, 1, '用户列表', UserList);
    } catch (error) {
      throw new Error('用户查询出错');
      this.Fail(res);
    }
  }
} 

export default new User();