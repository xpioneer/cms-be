/*qinfeng*/

import DB from '../models'

const ArticleType = DB.ArticleType;

class ArticleTypeService {

    static async getById (id) {
        const model = await ArticleType.findById(id);
        return model;
    }

    static async pages (params) {
        const pages = await ArticleType.findAndCountAll(params);
        return pages;
    }

    static async insert (model) {
        const result = await ArticleType.insert(model);
        return result;
    }

}

export default ArticleTypeService;