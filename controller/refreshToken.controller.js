import Validator from 'validatorjs'
import handler from './handlers/handlers'
import jwt from 'jsonwebtoken'

import jwtconfig from '../config/jwtconfig'


function RefreshTokenController(req, res) {

  const header = req.headers['authorization']
  const token = handler.getTokenFormHeader(header)

  jwt.verify(token, jwtconfig.secret, async function(err, decoded) {


    res.status(200).json({ sucess: true })
  })

}

module.exports = RefreshTokenController
