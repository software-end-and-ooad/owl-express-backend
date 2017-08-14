const express = require('express')
const app = module.exports
  = express.Router()
const mysql = require('../config/dbconfig').connection
const passwordHash = require('password-hash')

const uri = require('../constant/api').api
const AuthenticationRequest = require('./handlers/authentication-request')
const Validatorjs = require('validatorjs')

app.post(uri.auth, function (req, res) {
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

        res.status(200).json({ success: true, data: obj })
      }
      else
        res.status(401).json({ sucess: false, data: 'INVALID_CREDENTIALS' })
    }
    else
      res.status(401).json({ sucess: false, data: 'INVALID_CREDENTIALS' })
  })
})

app.post(uri.register, function (req, res) {

  const name = req.body.name;
  const role = req.body.role;
  const email = req.body.email;
  // const emailKMITL = AuthenticationRequest.setEmailKMITL(email)
  const domain = req.body.domain;
  const studentid = email;
  const faculty = req.body.faculty;
  const password = req.body.password;
  const repassword = req.body.repassword;

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
