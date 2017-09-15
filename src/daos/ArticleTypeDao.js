/*qinfeng*/

import DB from '../models'

const ArticleType = DB.ArticleType;

class ArticleTypeDao {

    static async getById (id) {
        const model = await ArticleType.findById(id);
        return model;
    }

    static async pages (conditions) {
        const params = {
            ...conditions,
            ...{
                attributes:['id', 'type_name', 'remark', 'created_at'],
                // order: [['created_at', 'desc']]
            }
        }
        const pages = await ArticleType.findAndCountAll(params);
        return pages;
    }

    static async insert (model) {
        const result = await ArticleType.insert(model);
        return result;
    }

    static async update (id, inputs) {
        let now = Date.now();
        console.log(now, 'Date.now()')
        const result = await ArticleType.update({
            type_name: inputs.type_name,
            remark: inputs.remark,
            updated_at: now
        }, {
            where: {
                id: id
            }
        });
        return result;
    }

}

export default ArticleTypeDao;