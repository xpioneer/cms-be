/*xpioneer*/

import ArticleDao from '../daos/ArticleDao';

class ArticleService {

  static async getById(id) {
    const article = await ArticleDao.getById(id);
    return article;
  }

  static async pages(conditions) {
    const pages = await ArticleDao.pages(conditions);
    return pages;
  }

  static async insert(model) {
    const result = await ArticleDao.insert(model);
    return result;
  }

  static async update(inputs) {
    const result = await ArticleDao.update(inputs);
    return result;
  }

  //更新状态删除
  static async delete(id, ctx) {
    let CUR_USER = ctx.session['CUR_USER'];
    const result = await ArticleDao.delete(id, CUR_USER);
    return result;
  }

}

export default ArticleService;
