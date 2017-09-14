import Sequelize from 'sequelize'
import DB from "./db"

const ArticleType = DB.defineModel('articletype', {
    type_name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    mark: {
      type: Sequelize.STRING(200),
      allowNull: true,
    }
  },
);

export default ArticleType