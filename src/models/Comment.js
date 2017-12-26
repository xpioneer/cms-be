import Sequelize from 'sequelize';
import db from "./db";

const Comment = db.defineModel('comment', {
  article_id: {
    type: Sequelize.STRING(32),
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT('long'),
    allowNull: false,
  },
  ip: {
    type: Sequelize.STRING(20),
    allowNull: false,
    defaultValue: 0
  },
  client: {
    type: Sequelize.STRING(500),
    allowNull: false,
    defaultValue: 0
  },
  parent_id: {
    type: Sequelize.STRING(32),
    allowNull: false,
    defaultValue: 0
  }
},
);

export default Comment;
