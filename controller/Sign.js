import BaseComponent from '../prototype/BaseComponent';
import UserModel from '../Models/User';

class Sign extends BaseComponent {
  constructor() {
    super()
    this.signup = this.signup.bind(this);
  }
  
  //注册接口
  async signup(req, res, next) {
    const { loginname, password } = req.body;
    let User = await UserModel.findOne({ loginname });
    if (!User) {
      let author_id = await this.IdComputed('author_id');
      const newUser = { password, author_id, loginname };
      await UserModel.create(newUser);
      req.session.author_id = author_id;
      req.session.loginname = loginname;
      res.send(this.Success(1, '用户注册成功'));
    } else {
      if (User.password == password) {
        req.session.author_id = User.author_id;
        req.session.loginname = loginname;
        res.send(this.Success(1, '登陆成功'));
      } else {
        res.send(this.Success(0, '密码错误'));
      }
    }
  }
}

export default new Sign();