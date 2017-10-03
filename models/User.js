import Sequelize from 'sequelize'
import sequelize from './Model'

const User = sequelize.define('users', {
  fullname: Sequelize.STRING,
  email: Sequelize.STRING,
  tell: Sequelize.STRING,
  type: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  rejected_order: Sequelize.INTEGER,
  sub_district: Sequelize.STRING,
  district: Sequelize.STRING,
  province: Sequelize.STRING,
  address_other: Sequelize.STRING,
  subscribe_sms: Sequelize.BOOLEAN,
  subscribe_line: Sequelize.BOOLEAN,
  confirm_token: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  activated: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  password: Sequelize.STRING,
},{
  updatedAt: 'updated_at',
  createdAt: 'created_at',
});

module.exports = User;
