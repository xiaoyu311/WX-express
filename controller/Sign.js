import BaseComponent from '../prototype/BaseComponent';
import UserModel from '../Models/User';

class Sign extends BaseComponent {
  constructor() {
    super()
    this.signup = this.signup.bind(this);
  }
  
  //注册接口
  async signup(req, res, next) {
    const { username, password } = req.body;
    let User = await UserModel.findOne({ username });
    if (!User) {
      let user_id = await this.IdComputed('user_id');
      const newUser = { user_id, username, password, collection: [] };
      await UserModel.create(newUser);
      req.session.user_id = user_id;
      req.session.username = username;
      res.send(this.Success(1, '用户注册成功'));
    } else {
      if (User.password == password) {
        req.session.user_id = User.user_id;
        req.session.username = username;
        res.send(this.Success(1, '登陆成功'));
      } else {
        res.send(this.Success(0, '密码错误'));
      }
    }
  }
}

export default new Sign();