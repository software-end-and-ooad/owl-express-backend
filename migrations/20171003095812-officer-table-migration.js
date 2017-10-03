'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      'officers',
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
        role: {
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
        officer_no: {
          type: Sequelize.INTEGER,
          allownull: false,
          unique: true
        },
        bank_account: {
          type: Sequelize.INTEGER,
          allownull: false,
        },
        profile_picture: {
          type: Sequelize.STRING,
          allownull: true
        },
        password: {
          type: Sequelize.STRING,
          allownull: false
        },
        created_at: {
          type: Sequelize.DATE,
        },
        updated_at: {
          type: Sequelize.DATE,
        },
      },
    )
  },
  down: function(queryInterface, Sequelize) {
    queryInterface.dropTable('officers')
  }
};

