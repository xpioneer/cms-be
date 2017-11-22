/*qinfeng*/
import R from 'ramda';
import DB from '../models'

const Comment = DB.Comment;
const User = DB.User;
const Article = DB.Article;
Comment.belongsTo(User, {as: 'creator', foreignKey: 'created_by', targetKey: 'id'});
Comment.belongsTo(Article, {foreignKey: 'article_id', targetKey: 'id'});

class CommentModel {
    constructor(){
        this.id = '';
        this.ip = '';
        this.content = '';
        this.client = '';
        this.created_by = '';
        this.created_at = '';
        this.username = '';
        this.title = '';
        this.abstract = '';
    }
}


class CommentDao {

    static async getById(id) {
        // const list = await DB.sequelize.query(`select c.*, u.username, a.title, a.abstract
        //     from comment c
        //         left join user u on u.id = c.created_by
        //         left join article a on a.id = c.article_id
        //     where c.id = ? 
        //     limit ?,?`, {
        //     replacements: [id, 0, 12],
        //     type: 'SELECT' 
        // });
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
        if(list.length > 0){
            return list[0];
        }
        return {};
    }

    static async pages(conditions, query) {
        const creator = {
            model: User,
            as: 'creator',
            attributes: ['id', 'username', 'nick_name', 'sex', 'user_type'],
            required: false,
        };
        if(query.username) {
            creator.where = {
                $like: `%${query.username}%`
            }
        }
        const article = {
            model: Article,
            as: 'article',
            attributes: ['id', 'title', 'abstract'],
            required: true,
        };
        if(query.article_title) {
            article.where = {
                title: {
                    $like: `%${query.article_title}%`
                }
            }
        }
        let params = R.mergeWith(R.concat, R.mergeDeepWith(R.concat, conditions, {
            where: {
                deleted_at: {$eq: null}
            },
            order: [['created_at', 'desc']]
        }), {
            attributes: ['id', 'article_id', 'content', 'ip', 'client', 'parent_id', 'created_at', 'created_by'],
            include: [creator, article]
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

// sequelize.QueryTypes

// { SELECT: 'SELECT',
//   INSERT: 'INSERT',
//   UPDATE: 'UPDATE',
//   BULKUPDATE: 'BULKUPDATE',
//   BULKDELETE: 'BULKDELETE',
//   DELETE: 'DELETE',
//   UPSERT: 'UPSERT',
//   VERSION: 'VERSION',
//   SHOWTABLES: 'SHOWTABLES',
//   SHOWINDEXES: 'SHOWINDEXES',
//   DESCRIBE: 'DESCRIBE',
//   RAW: 'RAW',
//   FOREIGNKEYS: 'FOREIGNKEYS',
//   SHOWCONSTRAINTS: 'SHOWCONSTRAINTS' }