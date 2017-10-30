import Sequelize from 'sequelize'
import sequelize from './Model'

import Province from './Province';
import District from './District';
import Subdistrict from './Subdistrict';

const Officer = sequelize.define('officers', {
  fullname: Sequelize.STRING,
  email: Sequelize.STRING,
  tell: Sequelize.STRING,
  role: Sequelize.STRING,
  sub_district: Sequelize.STRING,
  district: Sequelize.STRING,
  province: Sequelize.STRING,
  address_other: Sequelize.STRING,
  officer_no: Sequelize.INTEGER,
  bank_account: Sequelize.STRING,
  profile_picture: Sequelize.STRING,
  confirm_token: Sequelize.STRING,
  password: Sequelize.STRING,
},{
  updatedAt: 'updated_at',
  createdAt: 'created_at',
});


Officer.hasMany(Province, { foreignKey: 'PROVINCE_ID', sourceKey: 'province' })
Officer.hasMany(District, { foreignKey: 'AMPHUR_ID', sourceKey: 'district' })
Officer.hasMany(Subdistrict, { foreignKey: 'DISTRICT_ID', sourceKey: 'sub_district' })

module.exports = Officer;
