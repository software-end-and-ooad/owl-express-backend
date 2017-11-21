import jwt from 'jsonwebtoken'
import Validator from 'validatorjs'

import User from '../models/User';
import jwtconfig from '../config/jwtconfig'
import handler from './handlers/handlers';

function EditProfileController(req, res) {

  const header = req.headers['authorization']
  const token = handler.getTokenFormHeader(header) // Get token from authorization

  jwt.verify(token, jwtconfig.secret, async function(err, decoded) {

    if (!err) {
      const {
        tell,
        fullname,
        subdistrict,
        district,
        province,
        addressOther,
        subscribe_line,
        subscribe_sms
      } = req.body

      const data = {
        tell: tell,
        fullname: fullname,
        subdistrict: subdistrict,
        district: district,
        province: province,
        addressOther: addressOther,
        subscribe_sms: subscribe_sms,
        subscribe_line: subscribe_line
      }

      const rules = {
        fullname: 'required|max:40',
        tell: 'required|min:9|max:10',
        subdistrict: 'integer',
        district: 'integer',
        province: 'integer',
        addressOther: 'max:255|string',
        subscribe_sms: 'boolean',
        subscribe_line: 'boolean',
      };

      const errMessage = {
        required: ':attribute_IS_REQUIRED',
        max: ':attribute_MUST_LESS_THAN_:max',
        min: ':attribute_MUST_MORE_THAN_:min',
        string: ':attribute_MUST_BE_STRING',
        integer: ':attribute_MUST_BE_INTEGER',
        in: ':attribute_IS_NOT_IN_SPECIFIC',
        between: ':attribute_MUST_BE_IN_RANGE'
      }

      const validation = new Validator(data, rules, errMessage);

      validation.passes(async function() {

        const userid = decoded.sub

        const update = await User.update({
          fullname: fullname,
          tell: tell,
          sub_district: subdistrict==undefined? null: subdistrict==''? null: subdistrict,
          district: district==undefined? null: district==''? null: district,
          province: province==undefined? null: province==''? null: province,
          address_other: addressOther==undefined? null: addressOther==''? null: addressOther,
          subscribe_sms: subscribe_sms,
          subscribe_line: subscribe_line
        }, {
          where: {
            id: userid
          },
        })

        if (update[0] > 0) { // If found id and updated

          res.status(200).json({ sucess: true })
        } else {

          res.status(401).json({ sucess: false })
        }
      })

    validation.fails(function() {
      const errMsg = validation.errors.all()
      res.status(400).json({ success: false, data: errMsg})
    })

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

module.exports = EditProfileController
