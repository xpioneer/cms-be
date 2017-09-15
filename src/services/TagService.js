/*qinfeng*/

import TagDao from '../daos/TagDao'

class TagService {

    static async getById (id) {
        const article = await TagDao.getById(id);
        return article;
    }

    static async pages (conditions) {
        const pages = await TagDao.pages(conditions);
        return pages;
    }

    static async insert (model) {
        const result = await TagDao.insert(model);
        return result;
    }

    static async update (inputs) {
     const result = await TagDao.update(inputs);
     return result;
    }

    //更新状态删除
    static async delete (id) {
     const result = await TagDao.delete(id);
     return result;
    }

}

export default TagService;