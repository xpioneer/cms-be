/*qinfeng*/
import R from 'ramda';
import DB from '../models'

const Comment = DB.Comment;
const User = DB.User;
const Article = DB.Article;
Comment.belongsTo(User, {as: 'creator', foreignKey: 'created_by', targetKey: 'id'});
Comment.belongsTo(Article, {foreignKey: 'article_id', targetKey: 'id'});

class CommentDao {

    static async getById(id) {
        const model = await Comment.findOne({
            where: { id: id },
            include: [{
                model: User,
                as: 'creator',
                attributes: ['id', 'username', 'nick_name'],
                required: false,
            },{
                model: Article,
                as: 'article',
                attributes: ['id', 'title', 'abstract'],
                required: false,
            }]
        });
        return model;
    }

    static async pages(conditions) {
        const params = R.mergeWith(R.concat, R.mergeDeepWith(R.concat, conditions, {
            where: {
                deleted_at: {$eq:null}
            },
            order: [['created_at', 'desc']]
        }), {
            attributes: ['id', 'article_id', 'content', 'ip', 'client', 'parent_id', 'created_at', 'created_by'],
            include: [{
                model: User,
                as: 'creator',
                attributes: ['id', 'username', 'nick_name', 'sex', 'user_type'],
                required: false,
            },{
                model: Article,
                as: 'article',
                attributes: ['id', 'title', 'abstract'],
                required: false,
            }]
        });
        const pages = await Comment.findAndCountAll(params);
        return pages;
    }

    static async insert(model) {
        const result = await Comment.create(model);
        return result;
    }

    static async update(inputs) {
        const result = await Comment.update({
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

    static async delete(id, CUR_USER) {
        const result = await Comment.update({
            deleted_by: CUR_USER.id,
            deleted_at: Date.now()
        }, {
            where: {
                id: id
            }
        });
        return result;
    }

}

export default CommentDao;