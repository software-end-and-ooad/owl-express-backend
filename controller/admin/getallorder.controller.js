import jwt from 'jsonwebtoken'

import User from '../../models/User'
import Order from '../../models/Order';
import Province from '../../models/Province'
import District from '../../models/District'
import Subdistrict from '../../models/Subdistrict'

import jwtconfig from '../../config/jwtconfig'
import handler from '../handlers/handlers';

function GetAllOrderController(req, res) {

  const header = req.headers['authorization']
  const token = handler.getTokenFormHeader(header) // Get token from authorization

  jwt.verify(token, jwtconfig.adminSecret, async function(err, decoded) {

    if (!err) {
      const postman_id = decoded.pmi // The same as officer_id
      const isAdmin = req.params.isAdmin;

      let allOrder = await User.findAll({
        include: [{
          model: Order,
          where: isAdmin!='admin'? {
            $or: [ {postman_id: null}, {postman_id: postman_id} ]
          }: false,
          attributes: ['track', 'size', 'price', 'status', 'postman_id', 'transport_type', 'pickup_date', 'src_address_other', 'dest_address_other'],
          include: [
            {
              model: Province,
              attributes: [ 'PROVINCE_ID', 'PROVINCE_NAME', 'PROVINCE_CODE' ],
              as: 'src_provinces',
            }, {
              model: District,
              attributes: [ ['AMPHUR_ID', 'DISTRICT_ID'], ['AMPHUR_CODE', 'DISTRICT_CODE'], ['AMPHUR_NAME', 'DISTRICT_NAME'] ],
              as: 'src_districts'
            }, {
              model: Subdistrict,
              attributes: [ ['DISTRICT_ID', 'SUBDISTRICT_ID'], ['DISTRICT_CODE', 'SUBDISTRICT_CODE'], ['DISTRICT_NAME', 'SUBDISTRICT_NAME'], ['AMPHUR_ID', 'DISTRICT_ID'] ],
              as: 'src_subdistricts'
            }, {
              model: Province,
              as: 'dest_provinces',
            }, {
              model: District,
              attributes: [ ['AMPHUR_ID', 'DISTRICT_ID'], ['AMPHUR_CODE', 'DISTRICT_CODE'], ['AMPHUR_NAME', 'DISTRICT_NAME'] ],
              as: 'dest_districts'
            }, {
              model: Subdistrict,
              attributes: [ ['DISTRICT_ID', 'SUBDISTRICT_ID'], ['DISTRICT_CODE', 'SUBDISTRICT_CODE'], ['DISTRICT_NAME', 'SUBDISTRICT_NAME'], ['AMPHUR_ID', 'DISTRICT_ID'] ],
              as: 'dest_subdistricts'
            }
          ],
        }],
        attributes: ['id', 'email', 'fullname', 'tell']
      })

      if (allOrder != null) {

        res.status(200).json({ sucess: true, data: allOrder })
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

module.exports = GetAllOrderController
