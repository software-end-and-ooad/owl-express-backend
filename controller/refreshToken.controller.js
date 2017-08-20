import Validator from 'validatorjs'
import handler from './handlers/handlers'
import jwt from 'jsonwebtoken'

import jwtconfig from '../config/jwtconfig'


function RefreshTokenController(req, res) {

  const header = req.headers['authorization']
  const token = handler.getTokenFormHeader(header)

  jwt.verify(token, jwtconfig.secret, async function(err, decoded) {
    if (!err) {
      const userid = decoded.sub
      const timeNow = new Date().getTime()
      const jwtOptions = {
        sub: userid,
        secret: jwtconfig.secret,
        audience: jwtconfig.audience,
        issuer: jwtconfig.issuer,
        signIn: timeNow
      }
      const newToken = jwt.sign(jwtOptions, jwtconfig.secret, {expiresIn: jwtconfig.expire});

      res.status(200).json({ sucess: true, token: newToken })
    } else {

      res.status(400).json({ sucess: false, data: err.message })
    }

  })


}



module.exports = RefreshTokenController
