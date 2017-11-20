import Sequelize from 'sequelize'
import sequelize from './Model'

import Province from './Province';
import District from './District';
import Subdistrict from './Subdistrict';

const Order = sequelize.define('orders', {
  user_id: Sequelize.INTEGER,
  track: Sequelize.STRING,
  size: Sequelize.STRING,
  price: Sequelize.INTEGER,
  payment_status: Sequelize.STRING,
  status: Sequelize.STRING,
  postman_id: Sequelize.STRING,
  transport_type: Sequelize.STRING,
  src_subdistrict: Sequelize.STRING,
  src_district: Sequelize.STRING,
  src_province: Sequelize.STRING,
  src_address_other: Sequelize.STRING,
  dest_subdistrict: Sequelize.STRING,
  dest_district: Sequelize.STRING,
  dest_province: Sequelize.STRING,
  dest_address_other: Sequelize.STRING,
  pickup_date: Sequelize.DATE,
  create_at: Sequelize.DATE,
},{
  updatedAt: 'updated_at',
  createdAt: 'created_at',
});

Order.hasMany(Province, {as: 'src_provinces', foreignKey: 'PROVINCE_ID', sourceKey: 'src_province'})
Order.hasMany(District, {as: 'src_districts', foreignKey: 'AMPHUR_ID', sourceKey: 'src_district'})
Order.hasMany(Subdistrict, {as: 'src_subdistricts', foreignKey: 'DISTRICT_ID', sourceKey: 'src_subdistrict'})

Order.hasMany(Province, {as: 'dest_provinces', foreignKey: 'PROVINCE_ID', sourceKey: 'dest_province'})
Order.hasMany(District, {as: 'dest_districts', foreignKey: 'AMPHUR_ID', sourceKey: 'dest_district'})
Order.hasMany(Subdistrict, {as: 'dest_subdistricts', foreignKey: 'DISTRICT_ID', sourceKey: 'dest_subdistrict'})

module.exports = Order;
