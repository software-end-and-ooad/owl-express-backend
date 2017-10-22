import Validator from 'validatorjs'
import jwt from 'jsonwebtoken'
import passwordHash from 'password-hash'

import User from '../models/User'
import AuthenticationRequest from './handlers/handlers'
import jwtconfig from '../config/jwtconfig'
import Handler from './handlers/handlers';

async function RegisterController(req, res) {
  const {
    email,
    fullname,
    tell,
    type,
    password,
    repassword,
  } = req.body;

  const rules = {
    fullname: 'required|max:40',
    email: 'required|max:255|email',
    tell: 'required|min:9|max:10', //unique
    type: 'required|in:personal,enterprise',
    password: 'required|min:6',
    repassword: 'required|same:password'
  };

  const errMessage = {
    required: ':attribute_IS_REQUIRED',
    email: ':attribute_IS_NOT_EMAIL',
    same: ':attribute_IS_NOT_MATCH',
    min: ':attribute_MUST_MORE_:min',
    max: ':attribute_MUST_LESS_:max',
    in: ':attribute_IS_NOT_IN_SPECIFIC'
  }

  const validation = new Validator(req.body, rules, errMessage);

  validation.passes(async function () {

    // EVERY THING PASS, READY TO REGISTER HERE
    const saveData = {
      fullname: fullname,
      email: email,
      tell: tell,
      type: type,
      password: passwordHash.generate(password),
      confirm_token: await Handler.confirmtokenGenerate(),
    }

    // Validation Manual
    if (type != 'personal' && type != 'enterprise') // type must be personal or enterprise
      res.status(401).json({ success: false, data: ['type_INVALID']})

    else {
      // Find email and Save data to db if there is not in db
      const results = await User.findOrCreate({
        defaults: saveData,
        where: {
          email: email,
        },
        attributes: ['id']
      })
      const result = results[1] // result of insertion <boolean>
      const user = results[0] // object of inserted data <object>

      if (result == false)
        res.status(401).json({ success: false, data: ['email_HAS_USED'] })

      else {
        // Generate JWT token
        const token = jwt.sign({
          sub: user.id,
          secret: jwtconfig.secret,
          audience: jwtconfig.audience,
          issuer: jwtconfig.issuer,
          signIn: new Date().getTime()
        }, jwtconfig.secret, {expiresIn: jwtconfig.expire});

        const obj = { //Response object
          id: user.id,
          fullname: user.fullname,
          email: user.email,
          tell: user.tell,
          type: user.type
        }

        res.status(200).json({ success: true, data: obj, token: token })
      }
    }
  });

  validation.fails(function() {
    const errMsg = validation.errors.all()
    res.status(400).json({ success: false, data: errMsg})
  })

}


module.exports = RegisterController
