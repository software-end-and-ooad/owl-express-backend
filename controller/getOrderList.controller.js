import jwt from 'jsonwebtoken'

import Order from '../models/Order'
import jwtconfig from '../config/jwtconfig'
import handler from './handlers/handlers';

function GetOrderListController(req, res) {

  const header = req.headers['authorization']
  const token = handler.getTokenFormHeader(header) // Get token from authorization

  jwt.verify(token, jwtconfig.secret, async function(err, decoded) {

    if (!err) {
      const userId = decoded.sub

      const result = await Order.findAll({
        where: {
          user_id: userId
        },
        attributes: [ 'track', 'size', 'price', 'payment_type', 'status', 'payment_status', 'transport_type', 'pickup_date']
      })

      if (result != null) {
        const user = result.dataValues;

        res.status(200).json({ sucess: true, data: result })
      } else {
        res.status(200).json({ sucess: true, data: {} })
      }

    } else {
      // Custom popular jwt error message
      if (err.message == 'jwt expired')
        err.message = 'TOKEN_EXPIRED'
      else if(err.message == 'invalid signature') // jwt secret is not match || token not match
        err.message = 'TOKEN_INVALID'
      else if(err.message == 'jwt must be provided')
        err.message = 'TOKEN_MUST_BE_PROVIDED'

      res.status(401).json({ sucess: false, data: err.message })
    }
  });

}

module.exports = GetOrderListController
