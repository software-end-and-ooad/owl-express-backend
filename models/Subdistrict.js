import Sequelize from 'sequelize'
import sequelize from './Model'

const Subdistrict = sequelize.define('sub_district', {
  DISTRICT_ID: Sequelize.INTEGER,
  DISTRICT_CODE: Sequelize.STRING,
  DISTRICT_NAME: Sequelize.STRING,
  AMPHUR_ID: Sequelize.INTEGER,
  PROVINCE_ID: Sequelize.INTEGER,
  GEO_ID: Sequelize.INTEGER,
}, {
  freezeTableName: true
});

module.exports = Subdistrict;
