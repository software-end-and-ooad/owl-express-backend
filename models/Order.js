import Sequelize from 'sequelize'
import sequelize from './Model'

const Order = sequelize.define('orders', {
  track: Sequelize.STRING,
  size: Sequelize.STRING,
  price: Sequelize.INTEGER,
  payment_status: Sequelize.STRING,
  status: Sequelize.STRING,
  payment_type: Sequelize.STRING,
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

module.exports = Order;
