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
        name: {
          type: Sequelize.STRING,
          allownull: false
        },
        username: {
          type: Sequelize.STRING,
          allownull: false
        },
        email: {
          type: Sequelize.STRING,
          allownull: false
        },
        domain: {
          type: Sequelize.STRING,
          allownull: false
        },
        role: {
          type: Sequelize.STRING,
          allownull: false
        },
        studentid: {
          type: Sequelize.STRING,
          allownull: false
        },
        faculty: {
          type: Sequelize.STRING,
          allownull: false
        },
        confirm: {
          type: Sequelize.STRING,
          allownull: false
        },
        token_confirm: {
          type: Sequelize.STRING,
          allownull: false
        },
        password: {
          type: Sequelize.STRING,
          allownull: false
        },
        ftp_password: {
          type: Sequelize.STRING,
          allownull: false
        },
        remember_token: {
          type: Sequelize.STRING,
          defaultvalue: false,
          allownull: true
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
    queryInterface.dropTable('users')
  }
};
