/*qinfeng*/

import UserDao from '../daos/UserDao'

class TagService {

    static async getById (id) {
        const article = await UserDao.getById(id);
        return article;
    }

    static async pages (conditions) {
        const pages = await UserDao.pages(conditions);
        return pages;
    }

    static async insert (model) {
        const result = await UserDao.insert(model);
        return result;
    }

    static async update (inputs) {
     const result = await UserDao.update(inputs);
     return result;
    }

    //更新状态删除
    static async delete (id) {
     const result = await UserDao.delete(id);
     return result;
    }

}

export default TagService;