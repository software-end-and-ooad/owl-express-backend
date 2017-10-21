import Sequelize from 'sequelize'
import sequelize from './Model'

const Province = sequelize.define('province', {
  PROVINCE_ID: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  PROVINCE_CODE: Sequelize.STRING,
  PROVINCE_NAME: Sequelize.STRING,
  GEO_ID: Sequelize.INTEGER,
}, {
  freezeTableName: true,
  updatedAt: false,
  createdAt: false,
});

module.exports = Province;
