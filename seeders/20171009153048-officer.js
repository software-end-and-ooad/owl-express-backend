'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'officers',
      [{
        fullname: 'admin admin',
        email: '58010361@kmitl.ac.th',
        tell: '0812345678',
        role: 'admin',
        officer_no: '1234',
        bank_account: '123123123',
        profile_picture: '/images/profile.jpg',
        password: '1234',
        
      }],
    )
  },

  down: function (queryInterface, Sequelize) {
  }
};
