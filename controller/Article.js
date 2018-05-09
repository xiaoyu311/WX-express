import BaseComponent from '../prototype/BaseComponent';

class Article extends BaseComponent {
  constructor() { 
    super()
    this.article_add = this.article_add.bind(this);
  }
  async article_add(req, res, next) {
    let id = await this.IdComputed('article_id');
    console.log(id);
    res.send({ one: 'one' });
  }
}

export default new Article();