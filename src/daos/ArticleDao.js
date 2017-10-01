/*qinfeng*/
import R from 'ramda';
import DB from '../models'

const Article = DB.Article;
const User = DB.User;
Article.hasOne(User, {as: 'creator', foreignKey: 'id', otherKey: 'created_by'})
class ArticleDao {

    static async getById(id) {
        const model = await Article.findById(id);
        return model;
    }

    static async pages(conditions) {
        const params = R.mergeWith(R.concat, R.mergeDeepWith(R.concat, conditions, {
            where: {
                deleted_at: {$eq:null}
            },
            order: [['created_at', 'desc']]
        }), {
            attributes: ['id', 'title', 'abstract', 'pics', 'praise', 'contempt', 'view_count', 'is_original', 'created_at'],
            include: [{
                model: User,
                association: 'creator',
                // as: 'creator',
                attributes: ['username', 'nick_name', 'sex', 'user_type'],
                // // paranoid: false,
                required: false,
            }]
        });
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