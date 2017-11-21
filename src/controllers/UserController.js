/*qinfeng*/
import Crypto from 'crypto';
import TOOLS from '../utils/tools';
import UserService from '../services/UserService';

const { DELAY, DateTimeF, Guid, Guid8 } = TOOLS;

const cryptoPwd = (pwd, key) => {
    return Crypto.createHmac('sha256', key).update(pwd).digest('hex');
}

class UserController {

    static async getById(ctx) {
        let id = ctx.params.id;
        if (id) {
            let user = await UserService.getById(id);
            if (user) {
                const model = {
                    id: user.id,
                    username: user.username,
                    nick_name: user.nick_name,
                    sex: user.sex,
                    user_type: user.user_type,
                    remark: user.remark
                }
                ctx.Json({ data: model });
            } else {
                ctx.Json({ data: user, status: 404 });
            }
        } else {
            ctx.throw(400);
        }
    }

    //GET
    static async pages(ctx) {
        let conditions = ctx.getParams;
        let pages = await UserService.pages(conditions);
        pages.rows.map(m => {
            m.created_at = DateTimeF(m.created_at);
            m.sex = m.sex ? '男' : '女';
            return m;
        });
        ctx.Pages({ page: pages });
    }

    //POST
    static async insert(ctx) {
        const inputs = ctx.request.fields;
        const pwd = inputs.password;
        if(pwd && pwd.length >= 6){
            let model = {
                username: inputs.username,
                password: cryptoPwd(pwd, inputs.username),
                nick_name: inputs.nick_name,
                sex: inputs.sex,
                user_type: inputs.user_type,
                remark: inputs.remark,
                created_by: ctx.session['CUR_USER'].id,
                updated_by: ctx.session['CUR_USER'].id,
            }
            const result = await UserService.insert(model);
            ctx.Json({ data: result, msg: '添加成功！' });
        }else{
            ctx.throw(400, '密码长度不够!')
        }
    }

    //PUT
    static async update(ctx) {
        const id = ctx.params.id;
        if (id) {
            const inputs = ctx.request.fields;
            const pwd = inputs.password;
            if(pwd && pwd.length >= 6){
                const model = {
                    id: id,
                    username: inputs.username,
                    password: cryptoPwd(pwd, inputs.username),
                    nick_name: inputs.nick_name,
                    sex: inputs.sex,
                    user_type: inputs.user_type,
                    remark: inputs.remark,
                    updated_by: ctx.session['CUR_USER'].id,
                }
                const result = await UserService.update(model);
                ctx.Json({ data: result });
            }else if(!pwd){
                const model = {
                    id: id,
                    username: inputs.username,
                    nick_name: inputs.nick_name,
                    sex: inputs.sex,
                    user_type: inputs.user_type,
                    remark: inputs.remark,
                    updated_by: ctx.session['CUR_USER'].id,
                }
                const result = await UserService.update(model);
                ctx.Json({ data: result });
            } else {
                ctx.throw(400, '密码长度不够!')
            }
        } else {
            ctx.throw(400)
        }

    }

    //DELETE
    static async delete(ctx) {
        const id = ctx.params.id;
        if (id) {
            const result = await UserService.delete(id, ctx);
            ctx.Json({ data: result, msg: '删除成功!' });
        } else {
            ctx.throw(400);
        }
    }

}

export default UserController;