import BaseComponent from '../prototype/BaseComponent';
import UserModel from '../Models/User';

class User extends BaseComponent {
  constructor() {
    super()
    this.info = this.info.bind(this);
  }
  // 查看用户信息
  async info(req, res, next) {
    let UserList = await UserModel.find();
    res.send(this.Success(1, '用户列表', UserList));
    return;
  }
} 

export default new User();