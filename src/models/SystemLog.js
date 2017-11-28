import Sequelize from 'sequelize'
import db from "./db"

const SystemLog = db.defineModel('system_log', {
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
    msg: {
      type: Sequelize.STRING(1000),
      allowNull: true
    },
    continent_code: {
      type: Sequelize.STRING(20),
      allowNull: true
    },
    continent_name_en: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    continent_name_zh: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    continent_geoname_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    country_iso_code: {
      type: Sequelize.STRING(20),
      allowNull: true
    },
    country_name_en: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    country_name_zh: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    country_geoname_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    subdivisions_iso_code: {
      type: Sequelize.STRING(20),
      allowNull: true
    },
    subdivisions_name_en: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    subdivisions_name_zh: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    subdivisions_geoname_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    city_name_en: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    city_name_zh: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    city_geoname_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    accuracy_radius: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    latitude: {
      type: Sequelize.STRING(10),
      allowNull: true
    },
    longitude: {
      type: Sequelize.STRING(10),
      allowNull: true
    },
    metro_code: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    time_zone: {
      type: Sequelize.STRING(50),
      allowNull: true
    }
  },
);

export default SystemLog