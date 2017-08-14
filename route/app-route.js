const express               = require('express')
const app                   = module.exports
                            = express.Router()
const mysql                 = require('../config/dbconfig').connection
const passwordHash          = require('password-hash')

const uri                   = require('../constant/api').api
const AuthenticationRequest = require('./handlers/authentication-request')


app.post(uri.auth, function (req, res) {
  const studentid = req.body.email;
  const password = req.body.password;
  const emailKMITL = AuthenticationRequest.setEmailKMITL(studentid) //set to studentid@kmtil.ac.th

  mysql.query(`SELECT id, password from users where email='${emailKMITL}'`, (error, results, fields) => {

    if (results != undefined && results.length > 0 ) {
      if( passwordHash.verify(password, results[0].password) == true ) {
        res.status(200).json({ success: true, data: studentid })
      }
      else
        res.status(401).json({ sucess: false, data: 'INVALID_CREDENTIALS'})
    }
    else
      res.status(401).json({ sucess: false, data: 'INVALID_CREDENTIALS'})
  })
})



app.get('/*', function (req, res) {
  res.status(404).send('NOT FOUND')
})
