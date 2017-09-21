/*qinfeng*/

import TOOLS from '../utils/tools';
import UserService from '../services/UserService';

const { DELAY, DateTimeF, Guid, Guid8 } = TOOLS;

class UserController {

    static async getById(ctx) {
        let id = ctx.params.id;
        if (id) {
            let tag = await UserService.getById(id);
            const model = {
                id: tag.id,
                username: tag.username,
                nick_name: tag.nick_name
            }
            ctx.Json({ data: model });
        } else {
            ctx.throw(400);
        }
    }

    //GET
    static async pages(ctx) {
        let conditions = ctx.getParams;
        let pages = await UserService.pages(conditions);
        pages.rows.map(m => {
            m.dataValues.created_at = DateTimeF(m.created_at);
            return m;
        });
        ctx.Pages({ page: pages });
    }

    //POST
    static async insert(ctx) {
        const inputs = ctx.request.fields;
        let model = {
            username: inputs.username,
            nick_name: inputs.nick_name
        }
        const result = await UserService.insert(model);
        ctx.Json({ data: result, msg: '添加成功！' });
    }

    //PUT
    static async update(ctx) {
        const id = ctx.params.id;
        if (id) {
            const inputs = ctx.request.fields;
            inputs.id = id;
            const result = await UserService.update(inputs);
            ctx.Json({ data: result });
        } else {
            ctx.throw(400)
        }

    }

    //DELETE
    static async delete(ctx) {
        const id = ctx.params.id;
        if (id) {
            const result = await UserService.delete(id);
            ctx.Json({ data: result, msg: '删除成功!' });
        } else {
            ctx.throw(400);
        }
    }

}

export default UserController;