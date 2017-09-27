/*qinfeng*/
import Crypto from 'crypto';
import DB from '../models'
import TOOLS from '../utils/tools';
import Session from '../utils/session'

const { DateTimeF } = TOOLS;
const User = DB.User;

class UserDao {

    static async getById(id) {
        const model = await User.findById(id);
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
                attributes: ['id', 'username', 'user_type', 'nick_name', 'created_at', 'sex', 'user_resource', 'remark'],
                // order: [['created_at', 'desc']]
            },
            where: {
                deleted_at: null
            }
        }
        const pages = await User.findAndCountAll(params);
        return pages;
    }

    static async insert(model) {
        const result = await User.create(model);
        return result;
    }

    static async update(model) {
        const _model = {
            username: model.username,
            user_type: model.user_type,
            password: model.password,
            nick_name: model.nick_name,
            sex: model.sex,
            user_type: model.user_type,
            remark: model.remark,
            updated_at: Date.now()
        };
        if(!_model.password) delete _model.password;
        const result = await User.update(_model, {
            where: {
                id: model.id
            }
        });
        return result;
    }

    static async delete(id, ctx) {
        const result = await User.update({
            deleted_by: ctx.session['CUR_USER'].id,
            deleted_at: Date.now()
        }, {
            where: {
                id: id
            }
        });
        return result;
    }

    static async login(username, password) {
        const count = await User.count({
            where: {
                username: username,
                password: password
            }
        });
        return count;
    }

    static async getByName(username) {
        let user = await User.findOne({
            attributes: ['id', 'username', 'user_type', 'sex', 'nick_name', 'user_resource', 'created_at'],
            where: {
                username: username
            }
        });
        user.dataValues.created_at = DateTimeF(user.created_at);
        return user;
    }

}

export default UserDao;