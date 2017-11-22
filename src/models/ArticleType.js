import Sequelize from 'sequelize'
import db from "./db"

const ArticleType = db.defineModel('article_type', {
    type_name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    remark: {
      type: Sequelize.STRING(200),
      allowNull: true,
    }
  },
);

export default ArticleType