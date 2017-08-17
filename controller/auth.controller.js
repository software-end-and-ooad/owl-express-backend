import jwt from 'jsonwebtoken'
import passwordHash from 'password-hash'
import Validator from 'validatorjs'
import crypto from 'crypto'

import User from '../model/User'
import jwtconfig from '../config/jwtconfig'
import AuthenticationRequest from './handlers/authentication.request'


async function LoginController(req, res) {
  const studentid = req.body.email;
  const password = req.body.password;
  const emailKMITL = AuthenticationRequest.setEmailKMITL(studentid) //set to studentid@kmtil.ac.th

  const data = {
    email: emailKMITL,
    password: password
  };

  const rules = {
    email: 'required|email',
    password: 'required'
  };

  const validation = new Validator(data, rules);

  if (validation.passes() == true) {
    const result = await User.findOne({
      where: {
        email: emailKMITL
      },
      attributes: ['id', 'email', 'name', 'username', 'password']
    })

    if (result != null) { // If found user
      const user = result.dataValues;

      if (passwordHash.verify(password, user.password) == true) { // Check password
        const obj = {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email
        }

        const token = jwt.sign({
          sub: user.id,
          secret: jwtconfig.secret,
          audience: jwtconfig.audience,
          issuer: jwtconfig.issuer
        }, jwtconfig.secret, {expiresIn: jwtconfig.expire});

        res.status(200).json({ sucess: true, data: obj, token: token })
      } else {
        res.status(401).json({ sucess: false, data: 'INVALID_CREDENTIALS' })
      }
    } else {
      res.status(401).json({ sucess: false, data: 'INVALID_CREDENTIALS' })
    }
  } else {
    res.status(401).json({ sucess: false, data: 'INVALID_CREDENTIALS' })
  }

}

module.exports = LoginController;

