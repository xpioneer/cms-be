/*xpioneer*/
import R from 'ramda';
import DB from '../models';

const ArticleType = DB.ArticleType;

class ArticleTypeDao {

  static async getById(id) {
    const model = await ArticleType.findById(id);
    return model;
  }

  static async pages(conditions) {
    const params = R.mergeWith(R.concat, R.mergeDeepWith(R.concat, conditions, {
      where: {
        deleted_at: {$eq:null}
      },
      order: [['created_at', 'desc']]
    }), {
      attributes: ['id', 'type_name', 'remark', 'created_at'],
    });
    const pages = await ArticleType.findAndCountAll(params);
    return pages;
  }

  static async insert(model) {
    const result = await ArticleType.create(model);
    return result;
  }

  static async update(id, inputs) {
    let now = Date.now();
    const result = await ArticleType.update({
      type_name: inputs.type_name,
      remark: inputs.remark,
      updated_at: now
    }, {
      where: {
        id: id
      }
    });
    return result;
  }

  static async delete(id) {
    const result = await ArticleType.update({
      updated_at: Date.now(),
      updated_by: 'now'
    }, {
      where: {
        id: id
      }
    });
    return result;
  }
}

export default ArticleTypeDao;
