import Sequelize from 'sequelize';

import TOOLS from '../utils/tools';
import { DBConfig, DBBallConfig } from '../../conf/DBConfig';

const { Guid } = TOOLS;

console.log('init sequelize...');

let sequelize = new Sequelize(DBConfig.database, DBConfig.username, DBConfig.password, {
  host: DBConfig.host,
  dialect: DBConfig.dialect,
  port: DBConfig.port,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  dialectOptions: {
    charset: 'utf8',
  },
  timezone: '+08:00'
});

const ID_TYPE = Sequelize.STRING(32);

function defineModel(name, attributes) {
  let attrs = {};
  attrs.id = {
    type: ID_TYPE,
    primaryKey: true
  };
  for (let key in attributes) {
    let value = attributes[key];
    if (typeof value === 'object' && value['type']) {
      value.allowNull = value.allowNull || false;
      attrs[key] = value;
    } else {
      attrs[key] = {
        type: value,
        allowNull: false
      };
    }
  }
  attrs.created_by = {
    type: ID_TYPE,
    allowNull: true
  };
  attrs.created_at = {
    type: Sequelize.BIGINT,
    allowNull: false
  };
  attrs.updated_by = {
    type: ID_TYPE,
    allowNull: true
  };
  attrs.updated_at = {
    type: Sequelize.BIGINT,
    allowNull: false
  };
  attrs.deleted_by = {
    type: ID_TYPE,
    allowNull: true
  };
  attrs.deleted_at = {
    type: Sequelize.BIGINT,
    allowNull: true
  };
  attrs.version = {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: "版本"
  };
  return sequelize.define(name, attrs, {
    tableName: name,
    timestamps: false,
    hooks: {
      beforeValidate: (obj) => {
        let now = Date.now();
        if (obj.isNewRecord) {
          if (!obj.id) {
            obj.id = Guid();
          }
          obj.created_at = now;
          obj.updated_at = now;
          obj.version = 0;
        } else {
          obj.updated_at = now;
          obj.version++;
        }
      },
      beforeUpdate: (model) => {
        console.log(model, 'model');
        obj.updated_at = now;
        obj.version++;
      }
    }
  });
}

let dbBalls = new Sequelize(DBBallConfig.database, DBBallConfig.username, DBBallConfig.password, {
  host: DBBallConfig.host,
  dialect: DBBallConfig.dialect,
  port: DBBallConfig.port,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  dialectOptions: {
    charset: 'utf8',
  },
  timezone: '+08:00'
});


export default {
  sequelize,
  dbBalls,
  defineModel,
  sync() {
    if (process.env.NODE_ENV !== 'production') {
      sequelize.sync({ force: true });
    } else {
      throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
    }
  }
};
