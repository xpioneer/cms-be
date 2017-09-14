import Sequelize from 'sequelize'

import TOOLS from '../utils/tools'
import DBConfig from '../config/DBConfig'

const { Guid } = TOOLS

console.log('init sequelize...');

let sequelize = new Sequelize(DBConfig.database, DBConfig.username, DBConfig.password, {
    host: DBConfig.host,
    dialect: DBConfig.dialect,
    port: DBConfig.port,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
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
      type: Sequelize.STRING(32),
      allowNull: false
    };
    attrs.created_at = {
        type: Sequelize.DATE,
        allowNull: false
    };
    attrs.created_by = {
      type: Sequelize.STRING(32),
      allowNull: false
    };
    attrs.updated_at = {
        type: Sequelize.DATE,
        allowNull: false
    };
    attrs.deleted_by = {
        type: Sequelize.STRING(32),
        allowNull: true
    };
    attrs.deleted_at = {
        type: Sequelize.DATE,
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
            beforeValidate: function (obj) {
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
            }
        }
    });
}

export default {
    defineModel,
    sync(){
        if (process.env.NODE_ENV !== 'production') {
            sequelize.sync({ force: true });
        } else {
            throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
        }
    }
}