/*qinfeng*/

import DB from '../models'

const Article = DB.Article;

class ArticleDao {

    static async getById(id) {
        const model = await Article.findById(id);
        return model;
    }

    static async pages(conditions) {
        if (!conditions.order || conditions.order.length == 0) {
            conditions.order = [
                ['created_at', 'desc']
            ];
        }
        const params = {
            ...conditions,
            ... {
                attributes: ['id', 'title', 'abstract', 'pics', 'praise', 'contempt', 'view_count', 'is_original', 'created_at'],
                // order: [['created_at', 'desc']]
            }
        }
        const pages = await Article.findAndCountAll(params);
        return pages;
    }

    static async insert(model) {
        const result = await Article.create(model);
        return result;
    }

    static async update(inputs) {

        const result = await Article.update({
            title: inputs.title,
            abstract: inputs.abstract,
            type_id: inputs.type_id,
            is_top: inputs.is_top,
            pics: inputs.pics,
            content: inputs.content,
            is_original: inputs.is_original,
            tag: inputs.tag,
            updated_at: Date.now()
        }, {
            where: {
                id: inputs.id
            }
        });
        return result;
    }

}

export default ArticleDao;