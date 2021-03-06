import jwt from 'jsonwebtoken'

import Officer from '../../models/officer'
import Province from '../../models/Province'
import District from '../../models/District'
import Subdistrict from '../../models/Subdistrict'
import jwtconfig from '../../config/jwtconfig'
import handler from '../handlers/handlers';

function GetAllOfficerController(req, res) {

  const header = req.headers['authorization']
  const token = handler.getTokenFormHeader(header) // Get token from authorization

  jwt.verify(token, jwtconfig.adminSecret, async function(err, decoded) {

    if (!err) {
      const userid = decoded.sub

      let allOfficer = await Officer.findAll({
        include: [{
          model: Province,
        }, {
          model: District,
          attributes: [ ['AMPHUR_ID', 'DISTRICT_ID'], ['AMPHUR_CODE', 'DISTRICT_CODE'], ['AMPHUR_NAME', 'DISTRICT_NAME'], 'PROVINCE_ID']
        }, {
          model: Subdistrict,
          attributes: [ ['DISTRICT_ID', 'SUBDISTRICT_ID'], ['DISTRICT_CODE', 'SUBDISTRICT_CODE'], ['DISTRICT_NAME', 'SUBDISTRICT_NAME'], ['AMPHUR_ID', 'DISTRICT_ID'], 'PROVINCE_ID']
        }],
        attributes: [ 'email', 'fullname', 'tell', 'role', 'officer_no', 'address_other' ]
      })

      if (allOfficer != null) {

        res.status(200).json({ sucess: true, data: allOfficer })
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

module.exports = GetAllOfficerController
