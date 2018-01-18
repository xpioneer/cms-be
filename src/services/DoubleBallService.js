/*xpioneer*/

import DoubleBallDao from '../daos/DoubleBallDao';

class DoubleBallService {

  static async getById(id) {
    const awards = await DoubleBallDao.getById(id);
    return awards;
  }

  static async pages(conditions) {
    const pages = await DoubleBallDao.pages(conditions);
    return pages;
  }

  static async insert(model) {
    const result = await DoubleBallDao.insert(model);
    return result;
  }

  //更新状态删除
  static async delete(id, ctx) {
    let CUR_USER = ctx.session['CUR_USER'];
    const result = await DoubleBallDao.delete(id, CUR_USER);
    return result;
  }

}

export default DoubleBallService;
