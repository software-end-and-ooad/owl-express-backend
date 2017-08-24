import Validator from 'validatorjs'
import jwt from 'jsonwebtoken'
import passwordHash from 'password-hash'

import User from '../models/User'
import AuthenticationRequest from './handlers/handlers'
import jwtconfig from '../config/jwtconfig'

async function RegisterController(req, res) {
  const {
    name,
    role,
    domain,
    studentid,
    faculty,
    password,
    repassword
  } = req.body;
  const emailKMITL = AuthenticationRequest.setEmailKMITL(studentid) //set to studentid@kmtil.ac.th

  const rules = {
    name: 'required|max:40',
    role: 'required|max:255|min:7',
    domain: 'required|min:4|max:14', //unique
    studentid: 'required|max:40',
    faculty: 'required|max:40',
    password: 'required|min:6',
    repassword: 'required|same:password'
  };

  const errMessage = {
    required: ':attribute_IS_REQUIRED',
    email: ':attribute_IS_NOT_EMAIL',
    same: ':attribute_IS_NOT_MATCH',
    min: ':attribute_MUST_MORE_:min',
    max: ':attribute_MUST_LESS_:max'
  }

  const validation = new Validator(req.body, rules, errMessage);

  validation.passes(async function () {
     //Check unique domain && studentid
    const uniqueEmail = await User.findOne({
      where: {
        email: emailKMITL
      },
      attributes: ['id']
    })
    const uniqueDomain = await User.findOne({
      where: {
        domain: domain
      },
      attributes: ['id']
    })

    if (uniqueEmail != null)
      res.status(401).json({ success: false, data: ['studentid_HAS_USED'] })

    else if (uniqueDomain != null)
      res.status(401).json({ success: false, data: ['domain_HAS_USED'] })

    else {
      // EVERY THING PASS, READY TO REGISTER HERE

      const saveData = {
        name: name,
        role: role,
        domain: domain,
        username: domain,
        email: emailKMITL,
        studentid: studentid,
        faculty: faculty,
        password: passwordHash.generate(password),
        confirm: 0,
        token_confirm: ConfirmtokenGenerate(),
        ftp_password: PasswordGenerate()
      }
      // Save data to db
      const results = await User.findOrCreate({
        defaults: saveData,
        where: {
          $or: [{
            email: emailKMITL,
            domain: domain
          }]
        },
        attributes: ['id']
      })
      const user = results[0];

      // Generate JWT token
      const token = jwt.sign({
        sub: user.id,
        secret: jwtconfig.secret,
        audience: jwtconfig.audience,
        issuer: jwtconfig.issuer,
        signIn: new Date().getTime()
      }, jwtconfig.secret, {expiresIn: jwtconfig.expire});

      const callback = {
        id: user.id,
        name: user.name,
        username: user.username,
        domain: user.domain,
        email: user.email,
        studentid: user.studentid,
        role: user.role,
        confirm: user.confirm,
        faculty: user.faculty
      }

      res.status(200).json({ success: true, data: callback, token: token })
    }


  });

  validation.fails(function() {
    const errMsg = validation.errors.all()
    res.status(400).json({ success: false, data: errMsg})
  })

}


function PasswordGenerate() {
  var password = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 10; i++)
    password += possible.charAt(Math.floor(Math.random() * possible.length));

  return password;
}

function ConfirmtokenGenerate() {
  var token = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$@&";

  for (var i = 0; i < 80; i++)
    token += possible.charAt(Math.floor(Math.random() * possible.length));

  return token;
}

module.exports = RegisterController
