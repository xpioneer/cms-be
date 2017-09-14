import Sequelize from 'sequelize'
import DB from "./db"

const Article = DB.defineModel('article', {
    type_id: {
      type: Sequelize.STRING(32),
      allowNull: false,
      unique: true
    },
    title: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    is_top: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    abstract: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    pics: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    content: {
      type: Sequelize.TEXT('long'),
      allowNull: false,
    },
    praise: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: 'number'
    },
    contempt: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: 'number'
    },
    view_count: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    user_id: {
      type: Sequelize.STRING(32),
      allowNull: false,
      comment: "审核状态描述"
    },
    is_original: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
);

export default Article