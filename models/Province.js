import Sequelize from 'sequelize'
import sequelize from './Model'

const Province = sequelize.define('province', {
  PROVINCE_ID: Sequelize.STRING,
  PROVINCE_CODE: Sequelize.STRING,
  PROVINCE_NAME: Sequelize.STRING,
  GEO_ID: Sequelize.INTEGER,
}, {
  freezeTableName: true
});

module.exports = Province;
