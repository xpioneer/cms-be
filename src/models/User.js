import Sequelize from 'sequelize'
import DB from "./db"

const User = DB.defineModel('user', {
    username: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    nick_name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    sex: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    user_type: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    user_resource: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    remark: {
      type: Sequelize.STRING(200),
      allowNull: true,
    }
  },
);

export default User