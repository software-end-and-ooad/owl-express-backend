module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.bulkInsert(
      'Users',
      [{
        name: 'test',
        username: 'test',
        email: 'test@kmitl.ac.th',
        domain: 'test',
        role: 'student',
        studentid: 'test',
        faculty: 'test',
        confirm: 0,
        token_confirm: 'test',
        password: '123456',
        ftp_password: 'test',
        remember_token: 'test',
        created_at: new Date(),
        updated_at: new Date(),
      }],
    )
  },

  down: function (queryInterface, Sequelize) {
  }
};
