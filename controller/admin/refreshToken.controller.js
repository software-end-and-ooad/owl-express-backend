import Validator from 'validatorjs'
import handler from '../handlers/handlers'
import jwt from 'jsonwebtoken'

import jwtconfig from '../../config/jwtconfig'


function RefreshTokenController(req, res) {
  const header = req.headers['authorization']
  const token = handler.getTokenFormHeader(header)

  jwt.verify(token, jwtconfig.adminSecret, async function(err, decoded) {
    if (!err) {
      const userid = decoded.sub
      const officer_no = decoded.pmi
      const timeNow = new Date().getTime()
      const jwtOptions = {
        sub: userid,
        pmi: officer_no,
        secret: jwtconfig.adminSecret,
        audience: jwtconfig.audience,
        issuer: jwtconfig.issuer,
        signIn: timeNow
      }
      const newToken = jwt.sign(jwtOptions, jwtconfig.adminSecret, {expiresIn: jwtconfig.expire});

      res.status(200).json({ sucess: true, token: newToken })
    } else {
      // Custom popular jwt error message
      if (err.message == 'jwt expired')
        err.message = 'TOKEN_EXPIRED'
      else if(err.message == 'invalid signature') // jwt secret is not match || token not match
        err.message = 'TOKEN_INVALID'
      else if(err.message == 'jwt must be provided')
        err.message = 'TOKEN_MUST_BE_PROVIDED'

      res.status(401).json({ sucess: false, token: err.message })
    }

  })


}



module.exports = RefreshTokenController
