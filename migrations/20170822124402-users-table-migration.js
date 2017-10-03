'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      'users',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        fullname: {
          type: Sequelize.STRING,
          allownull: false
        },
        email: {
          type: Sequelize.STRING,
          allownull: false,
          unique: true
        },
        tell: {
          type: Sequelize.STRING,
          allownull: false
        },
        type: {
          type: Sequelize.STRING,
          allownull: false
        },
        rejected_order: {
          type: Sequelize.INTEGER,
          allownull: false,
          defaultValue: 0
        },
        sub_district: {
          type: Sequelize.STRING,
          allownull: true,
        },
        district: {
          type: Sequelize.STRING,
          allownull: true,
        },
        province: {
          type: Sequelize.STRING,
          allownull: true,
        },
        address_other: {
          type: Sequelize.STRING,
          allownull: true,
        },
        subscribe_sms: {
          type: Sequelize.BOOLEAN,
          allownull: false,
          defaultValue: false
        },
        subscribe_line: {
          type: Sequelize.BOOLEAN,
          allownull: false,
          defaultValue: false
        },
        confirm_token: {
          type: Sequelize.STRING,
          allownull: false
        },
        activated: {
          type: Sequelize.BOOLEAN,
          allownull: false,
          defaultValue: false
        },
        password: {
          type: Sequelize.STRING,
          allownull: false
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      },
      {
        timestamps: true,
      }
    )
  },
  down: function(queryInterface, Sequelize) {
    queryInterface.dropTable('users')
  }
};
