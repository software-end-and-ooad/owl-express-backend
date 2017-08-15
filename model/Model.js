import Sequelize from 'sequelize'
import dbconfig from '../config/config'

const envd  = process.env.NODE_ENV || 'development'
const config = dbconfig[envd]

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: false,

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

});

module.exports = sequelize
