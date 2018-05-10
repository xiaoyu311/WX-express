import BaseComponent from '../prototype/BaseComponent';
import UserModel from '../Models/User';

class Sign extends BaseComponent {
  constructor() {
    super()
    this.signup = this.signup.bind(this);
  }
  
  signup() {}
}

export default new Sign();