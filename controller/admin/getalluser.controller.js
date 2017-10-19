import jwt from 'jsonwebtoken'

import User from '../../models/User'
import jwtconfig from '../../config/jwtconfig'
import handler from '../handlers/handlers';

function GetAllUserController(req, res) {

  const header = req.headers['authorization']
  const token = handler.getTokenFormHeader(header) // Get token from authorization

  jwt.verify(token, jwtconfig.adminSecret, async function(err, decoded) {

    if (!err) {
      const userid = decoded.sub

      const result = await User.findAll({
        attributes: ['id', 'email', 'fullname', 'tell', 'sub_district', 'district', 'province', 'address_other', 'subscribe_sms', 'subscribe_line', 'activated']
      })

      if (result != null) {

        res.status(200).json({ sucess: true, data: result })
      } else {

        res.status(200).json({ sucess: true, data: {} })
      }

    } else {
      // Custom popular jwt error message
      if (err.message == 'jwt expired')
        err.message = 'TOKEN_EXPIRED'
      else if(err.message == 'invalid signature') // jwt admin secret is not match || token not match
        err.message = 'TOKEN_INVALID'
      else if(err.message == 'jwt must be provided')
        err.message = 'TOKEN_MUST_BE_PROVIDED'

      res.status(401).json({ sucess: false, data: err.message })
    }
  });

}

module.exports = GetAllUserController
