/*xpioneer*/

import UserDao from '../daos/UserDao';

class TagService {

  static async getById(id) {
    const article = await UserDao.getById(id);
    return article;
  }

  static async pages(conditions) {
    const pages = await UserDao.pages(conditions);
    return pages;
  }

  static async insert(model) {
    const result = await UserDao.insert(model);
    return result;
  }

  static async update(model) {
    const result = await UserDao.update(model);
    return result;
  }

  //更新状态删除
  static async delete(id, ctx) {
    const result = await UserDao.delete(id, ctx);
    return result;
  }

  static async login(username, password) {
    const result = await UserDao.login(username, password);
    return result;
  }

  static async getByName(username) {
    const user = await UserDao.getByName(username);
    return user;
  }

}

export default TagService;
