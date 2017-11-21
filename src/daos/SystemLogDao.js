/*qinfeng*/
import R from 'ramda';
import DB from '../models'

const SystemLog = DB.SystemLog;
const User = DB.User;
SystemLog.belongsTo(User, {as: 'creator', foreignKey: 'created_by', targetKey: 'id'});

class SystemLogDao {

    static async getById(id) {
        const model = await SystemLog.findOne({
            where: { id: id },
            include: [{
                model: User,
                as: 'creator',
                attributes: ['id', 'username', 'nick_name', 'sex', 'user_type'],
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
            attributes: ['id', 'request_ip', 'request_url', 'request_method', 'request_params',
                'client_version', 'status', 'time', 'msg', 'created_at', 'created_by'],
            include: [{
                model: User,
                as: 'creator',
                attributes: ['id', 'username', 'nick_name', 'sex', 'user_type'],
                required: false,
            }]
        });
        const pages = await SystemLog.findAndCountAll(params);
        return pages;
    }

    static async insert(model) {
        const result = await SystemLog.create(model);
        return result;
    }

    static async update(inputs) {
        const result = await SystemLog.update({
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
        const result = await SystemLog.update({
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

export default SystemLogDao;