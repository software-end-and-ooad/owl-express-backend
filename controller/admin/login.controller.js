import jwt from 'jsonwebtoken'
import passwordHash from 'password-hash'
import Validator from 'validatorjs'

import Officer from '../../models/officer'
import jwtconfig from '../../config/jwtconfig'


async function LoginController(req, res) {
  const password = req.body.password
  const email = req.body.email

  const data = {
    email: email,
    password: password
  };

  const rules = {
    email: 'required|email',
    password: 'required'
  };

  const errMessage = {
    required: ':attribute_IS_REQUIRED',
    email: ':attribute_IS_NOT_EMAIL'
  }

  const validation = new Validator(data, rules, errMessage);

  validation.passes(async function() {
    const result = await Officer.findOne({
      where: {
        email: email
      },
      attributes: ['id', 'email', 'officer_no', 'password']
    })

    if (result != null) { // If found user
      const user = result.dataValues;

      if (passwordHash.verify(password, user.password) == true) { // Check password
        const obj = { // Response object
          id: user.id,
          officer_no: user.officer_no,
          email: user.email
        }

        const token = jwt.sign({
          sub: user.id,
          pmi: user.officer_no,
          secret: jwtconfig.adminSecret,
          audience: jwtconfig.audience,
          issuer: jwtconfig.issuer,
          signIn: new Date().getTime()
        }, jwtconfig.adminSecret, {expiresIn: jwtconfig.expire});

        res.status(200).json({ success: true, data: obj, token: token })
      } else {
        res.status(401).json({ success: false, data: 'INVALID_CREDENTIALS' })
      }
    } else {
      res.status(401).json({ success: false, data: 'INVALID_CREDENTIALS' })
    }
  })

  validation.fails(function() {
    const errMsg = validation.errors.all()
    res.status(400).json({ success: false, data: errMsg})
  })

}

module.exports = LoginController;

