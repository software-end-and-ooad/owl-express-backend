import jwt from 'jsonwebtoken'

import Order from '../models/Order'
import jwtconfig from '../config/jwtconfig'
import handler from './handlers/handlers';

function GetOrderListController(req, res) {

  const header = req.headers['authorization']
  const token = handler.getTokenFormHeader(header) // Get token from authorization

  jwt.verify(token, jwtconfig.secret, async function(err, decoded) {

/*
 *    if (!err) {
 *      const userid = decoded.sub
 *
 *      const result = await Order.findOne({
 *        where: {
 *          id: userid
 *        },
 *        attributes: ['id', 'email', 'fullname', 'tell', 'sub_district', 'district', 'province', 'address_other', 'subscribe_sms', 'subscribe_line', 'activated', 'password']
 *      })
 *
 *      if (result != null) {
 *        const user = result.dataValues;
 *
 *        const obj = {
 *          id: user.id,
 *          fullname: user.fullname,
 *          tell: user.tell,
 *          email: user.email,
 *          sub_district: user.sub_district,
 *          district: user.district,
 *          province: user.province,
 *          address_other: user.address_other,
 *          subscribe_sms: user.subscribe_sms,
 *          subscribe_line: user.subscribe_line,
 *          activated: user.activated
 *        }
 *
 *        res.status(200).json({ sucess: true, data: obj })
 *      } else {
 *        res.status(200).json({ sucess: true, data: {} })
 *      }
 *
 *    } else {
 *      // Custom popular jwt error message
 *      if (err.message == 'jwt expired')
 *        err.message = 'TOKEN_EXPIRED'
 *      else if(err.message == 'invalid signature') // jwt secret is not match || token not match
 *        err.message = 'TOKEN_INVALID'
 *      else if(err.message == 'jwt must be provided')
 *        err.message = 'TOKEN_MUST_BE_PROVIDED'
 *
 *      res.status(401).json({ sucess: false, data: err.message })
 *    }
 */
  });

}

module.exports = GetOrderListController
