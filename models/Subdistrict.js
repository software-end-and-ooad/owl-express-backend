import Sequelize from 'sequelize'
import sequelize from './Model'

const Subdistrict = sequelize.define('sub_district', {
  DISTRICT_ID: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  DISTRICT_CODE: Sequelize.STRING,
  DISTRICT_NAME: Sequelize.STRING,
  AMPHUR_ID: Sequelize.INTEGER,
  PROVINCE_ID: Sequelize.INTEGER,
  GEO_ID: Sequelize.INTEGER,
}, {
  freezeTableName: true,
  updatedAt: false,
  createdAt: false,
});

module.exports = Subdistrict;
