import Sequelize from 'sequelize'
import sequelize from './Model'

const District = sequelize.define('district', {
  AMPHUR_ID: Sequelize.INTEGER,
  AMPHUR_CODE: Sequelize.STRING,
  AMPHUR_NAME: Sequelize.STRING,
  GEO_ID: Sequelize.INTEGER,
  PROVINCE_ID: Sequelize.INTEGER,
}, {
  freezeTableName: true
});

module.exports = District;
