import express               from 'express'
import mysql                 from '../config/dbconfig';
import passwordHash          from 'password-hash'
import jwt                   from 'jsonwebtoken'

import api                   from '../constant/api'
import AuthenticationRequest from './handlers/authentication-request'
import Validatorjs           from 'validatorjs'
import secretJWT             from '../config/secret-jwt'

mysql.connect()
const app = express.Router()

app.post(api.auth, function (req, res) {
  const studentid = req.body.email;
  const password = req.body.password;
  const emailKMITL = AuthenticationRequest.setEmailKMITL(studentid) //set to studentid@kmtil.ac.th

  mysql.query(`SELECT id, email, username, name, password from users where email='${emailKMITL}'`, (error, results, fields) => {

    if (results != undefined && results.length > 0) {
      if (passwordHash.verify(password, results[0].password) == true) {

        // Set user properties into obj
        const obj = {
          id: results[0].id,
          email: results[0].email,
          username: results[0].username,
          name: results[0].name
        }
        const token = jwt.sign({
          iss: 'https://webserv.kmtil.ac.th'
        }, secretJWT);

        res.status(200).json({ success: true, data: obj, token: token })
      }
      else
        res.status(401).json({ sucess: false, data: 'INVALID_CREDENTIALS' })
    }
    else
      res.status(401).json({ sucess: false, data: 'INVALID_CREDENTIALS' })
  })
})


app.post(api.register, function (req, res) {

  const {
    name,
    role,
    email,
    domain,
    studentid,
    faculty,
    password,
    repassword
  } = req.body;

  const rules = {
    name: 'required',
    role: 'required',
    email: 'required',
    domain: 'required',
    studentid: 'required',
    faculty: 'required',
    password: 'required',
    repassword: 'required'
  };

  let validation = new Validatorjs(req.body, rules);
  validation.passes(function () {
    res.status(200).json({ sucess: true, data: undefined })
  });
  validation.fails(function () {
    res.status(400).send(validation.errors);
  });


})


app.get('/*', function (req, res) {
  res.status(404).send('NOT FOUND')
})

module.exports = app;
