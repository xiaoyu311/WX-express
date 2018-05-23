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
      let user_id = await this.IdComputed('user_id');
      const newUser = { password, user_id, loginname };
      UserModel.create(newUser, err => {
        if (err) {
          throw new Error('用户创建失败'); 
          this.Fail(res);
          return;
        }
        req.session.user_id = user_id;
        req.session.loginname = loginname;
        this.Success(res, 1, '用户注册成功');
        return;
      });
    } else {
      console.log(req.sessionID);
      if (User.password == password) {
        req.session.user_id = User.user_id;
        req.session.loginname = loginname;
        this.Success(res, 1, '登陆成功');
        return;
      } else {
        this.Success(res, 0, '密码错误');
        return;
      }
    }
  }
}

export default new Sign();