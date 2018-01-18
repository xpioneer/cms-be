import Sequelize from 'sequelize';
import db from "./db";
import TOOLS from '../utils/tools';

const { Guid } = TOOLS;

const DoubleBall = db.dbBalls.define('awards', {
    id: {
      type: Sequelize.STRING(32),
      primaryKey: true,
      unique: true
    },
    red_balls: {
      type: Sequelize.STRING(25),
      allowNull: false,
    },
    blue_ball: {
      type: Sequelize.STRING(2),
      allowNull: false,
    },
    gen_result: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    award: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    created_by: {
      type: Sequelize.STRING(32),
      allowNull: true
    },
    created_at: {
      type: Sequelize.BIGINT,
      allowNull: true
    },
    created_by: {
      type: Sequelize.STRING(32),
      allowNull: true
    },
    created_by: {
      type: Sequelize.BIGINT,
      allowNull: true
    },
    version: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    }
  }, {
    tableName: 'awards',
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

export default DoubleBall;
