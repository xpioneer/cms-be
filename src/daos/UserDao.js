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
                attributes: ['id', 'username', 'user_type', 'nick_name', 'created_at'],
                // order: [['created_at', 'desc']]
            }
        }
        const pages = await User.findAndCountAll(params);
        return pages;
    }

    static async insert(model) {
        const result = await User.create(model);
        return result;
    }

    static async update(inputs) {
        const result = await User.update({
            username: inputs.username,
            user_type: inputs.user_type,
            updated_at: Date.now()
        }, {
            where: {
                id: inputs.id
            }
        });
        return result;
    }

    static async delete(id) {
        console.log(Session)
        const result = await User.update({
            delete_by: 'heheda',
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