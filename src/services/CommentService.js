/*qinfeng*/

import CommentDao from '../daos/CommentDao'

class CommentService {

    static async getById (id) {
        const article = await CommentDao.getById(id);
        return article;
    }

    static async pages (conditions, query) {
        const pages = await CommentDao.pages(conditions, query);
        return pages;
    }

    static async insert (model) {
        const result = await CommentDao.insert(model);
        return result;
    }

    static async update (inputs) {
        const result = await CommentDao.update(inputs);
        return result;
    }

    //更新状态删除
    static async delete (id, ctx) {
        let CUR_USER = ctx.session['CUR_USER'];
        const result = await CommentDao.delete(id, CUR_USER);
        return result;
    }

}

export default CommentService;