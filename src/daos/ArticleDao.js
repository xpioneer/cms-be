/*qinfeng*/

import DB from '../models'

const Article = DB.Article;

class ArticleDao {

    static async getById (id) {
        const model = await Article.findById(id);
        return model;
    }

    static async pages (conditions) {
        if(!conditions.order || conditions.order.length == 0){
            conditions.order = [['created_at', 'desc']];
        }
        const params = {
            ...conditions,
            ...{
                attributes:['id', 'title', 'abstract', 'pics', 'praise', 'contempt', 'view_count', 'is_original', 'created_at'],
                // order: [['created_at', 'desc']]
            }
        }
        const pages = await Article.findAndCountAll(params);
        return pages;
    }

    static async insert (model) {
        const result = await Article.insert(model);
        return result;
    }

    static async update (id, inputs) {
        
        const result = await Article.update({
            type_name: inputs.type_name,
            remark: inputs.remark,
            updated_at: Date.now()
        }, {
            where: {
                id: id
            }
        });
        return result;
    }

}

export default ArticleDao;
