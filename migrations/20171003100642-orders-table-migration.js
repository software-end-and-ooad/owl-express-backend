'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      'orders',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        user_id: {
          type: Sequelize.INTEGER,
          allownull: false
        },
        track: {
          type: Sequelize.STRING,
          allownull: true,
          unique: true
        },
        size: {
          type: Sequelize.STRING,
          allownull: true
        },
        price: {
          type: Sequelize.INTEGER,
          allownull: true
        },
        payment_status: {
          type: Sequelize.STRING,
          allownull: false,
          defaultValue: 'NOT'
        },
        status: {
          type: Sequelize.STRING,
          allownull: false
        },
        payment_type: {
          type: Sequelize.STRING,
          allownull: false
        },
        postman_id: {
          type: Sequelize.STRING,
          allownull: false,
          unique: true
        },
        transport_type: {
          type: Sequelize.STRING,
          allownull: false
        },
        src_subdistrict: {
          type: Sequelize.STRING,
          allownull: false
        },
        src_district: {
          type: Sequelize.STRING,
          allownull: false
        },
        src_province: {
          type: Sequelize.STRING,
          allownull: false
        },
        src_address_other: {
          type: Sequelize.STRING,
          allownull: false
        },
        dest_subdistrict: {
          type: Sequelize.STRING,
          allownull: false
        },
        dest_district: {
          type: Sequelize.STRING,
          allownull: false
        },
        dest_province: {
          type: Sequelize.STRING,
          allownull: false
        },
        dest_address_other: {
          type: Sequelize.STRING,
          allownull: false
        },
        pickup_date: {
          type: Sequelize.DATE,
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
    queryInterface.dropTable('orders')
  }
};

