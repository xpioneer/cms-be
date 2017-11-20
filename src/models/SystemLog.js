import Sequelize from 'sequelize'
import DB from "./db"

const SystemLog = DB.defineModel('system_log', {
    request_ip: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    request_url: {
      type: Sequelize.STRING(500),
      allowNull: false,
    },
    request_method: {
      type: Sequelize.STRING(10),
      allowNull: true,
    },
    request_params: {
      type: Sequelize.TEXT('long'),
      allowNull: true,
    },
    request_client: {
      type: Sequelize.STRING(500),
      allowNull: true
    },
    client_type: {
      type: Sequelize.STRING(20),
      allowNull: true
    },
    client_version: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    host: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    hostname: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    origin: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    path: {
      type: Sequelize.STRING(1000),
      allowNull: true
    },
    request_header: {
      type: Sequelize.STRING(2000),
      allowNull: true
    },
    protocol: {
      type: Sequelize.STRING(10),
      allowNull: true
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    time: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    time: {
      type: Sequelize.STRING(1000),
      allowNull: true
    }
  },
);

export default SystemLog