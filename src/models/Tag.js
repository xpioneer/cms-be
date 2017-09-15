import Sequelize from 'sequelize'
import DB from "./db"

const Tag = DB.defineModel('tag', {
    name: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    remark: {
      type: Sequelize.STRING(200),
      allowNull: true,
    }
  },
);

export default Tag