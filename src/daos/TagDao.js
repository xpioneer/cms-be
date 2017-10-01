/*qinfeng*/
import R from 'ramda';
import DB from '../models'

const Tag = DB.Tag;

class TagDao {

    static async getById(id) {
        const model = await Tag.findById(id);
        return model;
    }

    static async pages(conditions) {
        const params = R.mergeWith(R.concat, R.mergeDeepWith(R.concat, conditions, {
            where: {
                deleted_at: {$eq:null}
            },
            order: [['created_at', 'desc']]
        }), {
            attributes: ['id', 'name', 'remark', 'created_at'],
        });
        const pages = await Tag.findAndCountAll(params);
        return pages;
    }

    static async insert(model) {
        const result = await Tag.create(model);
        return result;
    }

    static async update(inputs) {
        const result = await Tag.update({
            name: inputs.name,
            remark: inputs.remark,
            updated_at: Date.now()
        }, {
            where: {
                id: inputs.id
            }
        });
        return result;
    }

    static async delete(id) {
        const result = await Tag.update({
            delete_by: 'heheda',
            deleted_at: Date.now()
        }, {
            where: {
                id: id
            }
        });
        return result;
    }

}

export default TagDao;