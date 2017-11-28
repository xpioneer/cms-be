/*qinfeng*/

import SystemLogDao from '../daos/SystemLogDao'

class SystemLogService {

    static async getById (id) {
        const model = await SystemLogDao.getById(id);
        return model;
    }

    static async pages (conditions) {
        const pages = await SystemLogDao.pages(conditions);
        return pages;
    }

    static async insert (ctx, model, status) {
        model.created_by = ctx.session && ctx.session['CUR_USER'] ? ctx.session['CUR_USER'].id : null;
        model.status = status || ctx.status;
        const result = await SystemLogDao.insert(model);
        return result;
    }

    static async update (inputs) {
        const result = await SystemLogDao.update(inputs);
        return result;
    }

    //更新状态删除
    static async delete (id, ctx) {
        let CUR_USER = ctx.session['CUR_USER'];
        const result = await SystemLogDao.delete(id, CUR_USER);
        return result;
    }

    static async updateModel(model) {
        const result = await SystemLogDao.update(model);
        return result;
    }

    static async findAllEN() {
        const result = await SystemLogDao.findAllEN();
        return result;
    }

}

export default SystemLogService;