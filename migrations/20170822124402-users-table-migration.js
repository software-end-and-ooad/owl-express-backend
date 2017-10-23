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
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        tell: {
          type: Sequelize.STRING,
          allowNull: false
        },
        type: {
          type: Sequelize.STRING,
          allowNull: false
        },
        rejected_order: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        sub_district: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        district: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        province: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        address_other: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        subscribe_sms: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        subscribe_line: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        confirm_token: {
          type: Sequelize.STRING,
          allowNull: false
        },
        activated: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      },
      {
        timestamps: true,
        charset: 'utf8',
        collate: 'utf8_general_ci'
      }
    )
  },
  down: function(queryInterface, Sequelize) {
    queryInterface.dropTable('users')
  }
};
