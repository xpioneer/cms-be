/*qinfeng*/

import ArticleTypeDao from '../daos/ArticleTypeDao'

class ArticleTypeService {

    static async getById (id) {
        const model = await ArticleTypeDao.getById(id);
        return model;
    }

    static async pages (conditions) {
        const pages = await ArticleTypeDao.pages(conditions);
        return pages;
    }

    static async insert (model) {
        const result = await ArticleTypeDao.insert(model);
        return result;
    }

    static async update (id, inputs) {
        const result = await ArticleTypeDao.update(id, inputs);
        return result;
    }

}

export default ArticleTypeService;