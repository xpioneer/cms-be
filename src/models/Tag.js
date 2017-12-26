import Sequelize from 'sequelize';
import db from "./db";

const Tag = db.defineModel('tag', {
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

export default Tag;
