import Sequelize from 'sequelize'

const sequelize = new Sequelize('webserv', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

});

module.exports = sequelize
