const express           = require('express');
const app               = module.exports
                        = express.Router();
const passwordHash      = require('password-hash');

const uri               = require('../constant/api').api
const controllerService = require('../controller/authenController').controllerService


app.post(uri.auth, function (req, res) {
  const login    = controllerService.authentication;
  const username = req.body.username;
  const password = req.body.password;

  if (login(username, password) != undefined && login(username, password) == true )
    res.json({ success: true, data: username })
  else
    res.json({ success: true, data: undefined })

})


app.get('/*', function (req, res) {
  res.status(404).send('NOT FOUND')
})
