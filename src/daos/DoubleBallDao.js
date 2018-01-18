/*xpioneer*/
import R from 'ramda';
import DB from '../models';

const DoubleBall = DB.DoubleBall;
const User = DB.User;
// DoubleBall.belongsTo(User, {as: 'creator', foreignKey: 'created_by', targetKey: 'id'});

class DoubleBallDao {

  static async getById(id) {
    const model = await DoubleBall.findById(id);
    return model;
  }

  static async pages(conditions) {
    const params = R.mergeWith(R.concat, R.mergeDeepWith(R.concat, conditions, {
      where: {
        deleted_at: {$eq:null}
      },
      order: [['created_at', 'desc']]
    }), {
      attributes: ['id', 'red_balls', 'blue_ball', 'gen_result', 'award', 'created_at', 'created_by'],
      // include: [{
      //   model: User,
      //   as: 'creator',
      //   attributes: ['id', 'username', 'nick_name', 'sex', 'user_type'],
      //   required: false,
      // }]
    });
    const pages = await DoubleBall.findAndCountAll(params);
    return pages;
  }

  static async insert(model) {
    console.log(model)
    const result = await DoubleBall.create(model);
    return result;
  }

  static async delete(id, CUR_USER) {
    const result = await DoubleBall.update({
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

export default DoubleBallDao;
