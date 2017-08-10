const mysql = require('../config/dbconfig').connection

const authentication = function(studentid, password) {
  mysql.query(`SELECT id from users where studentid='${studentid}'`, function (error, results, fields) {
    if (error) throw error;

    if (results != undefined && results.length > 0 ) {
      return true;
    }
    else
      return false;
  })
}

exports.controllerService = {
  authentication: authentication
}

