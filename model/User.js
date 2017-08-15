import Sequelize from 'sequelize'
import sequelize from '../config/dbconfig'

const User = sequelize.define('users', {
  name: Sequelize.STRING,
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  domain: Sequelize.STRING,
  role: Sequelize.STRING,
  studentid: Sequelize.STRING,
  faculty: Sequelize.STRING,
  confirm: Sequelize.STRING,
  token_confirm: Sequelize.STRING,
  password: Sequelize.STRING,
  ftp_password: Sequelize.STRING,
  remember_token: Sequelize.STRING,
  created_at: Sequelize.DATE,
},{
  updatedAt: 'updated_at',
  createdAt: 'created_at',
});

module.exports = User;
