import jwt from 'jsonwebtoken'
import Validator from 'validatorjs'

import Officer from '../../models/officer'
import jwtconfig from '../../config/jwtconfig'
import handler from '../handlers/handlers';

function EditOfficerController(req, res) {

  const header = req.headers['authorization']
  const token = handler.getTokenFormHeader(header) // Get token from authorization

  jwt.verify(token, jwtconfig.adminSecret, async function(err, decoded) {

    if (!err) {
      const {
        email,
        fullname,
        tell,
        role,
        province,
        district,
        sub_district,
        address_other,
      } = req.body

      const rules = {
        email: 'required|max:255|email',
        fullname: 'required|max:40',
        tell: 'required|min:9|max:10', //unique
        role: 'required|in:admin,officer',
        sub_district: 'required|integer',
        district: 'required|integer',
        province: 'required|integer',
        address_other: 'required|max:255|string',
      };

      const errMessage = {
        required: ':attribute_IS_REQUIRED',
        boolean: ':attribute_MUST_BE_BOOLEAN',
        max: ':attribute_MUST_LESS_THAN_:max',
        min: ':attribute_MUST_MORE_THAN_:min',
        string: ':attribute_MUST_BE_STRING',
        integer: ':attribute_MUST_BE_INTEGER',
        in: ':attribute_IS_NOT_IN_SPECIFIC',
      }

      const validation = new Validator(req.body, rules, errMessage);

      validation.passes(async function() {

        const userId = decoded.sub

        const update = await Officer.update({
          fullname: fullname,
          tell: tell,
          role: role,
          sub_district: sub_district==undefined? null: sub_district==''? null: sub_district,
          district: district==undefined? null: district==''? null: district,
          province: province==undefined? null: province==''? null: province,
          address_other: address_other==undefined? null: address_other==''? null: address_other,
        }, {
          where: {
            email: email,
          },
        })

        if (update[0] > 0) { // If found id and updated

          res.status(200).json({ sucess: true })
        } else {

          res.status(200).json({ sucess: false })
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

module.exports = EditOfficerController
