import jwt from 'jsonwebtoken'
import Validator from 'validatorjs'

import User from '../../models/User'
import jwtconfig from '../../config/jwtconfig'
import handler from '../handlers/handlers';

function EditUserController(req, res) {

  const header = req.headers['authorization']
  const token = handler.getTokenFormHeader(header) // Get token from authorization

  jwt.verify(token, jwtconfig.adminSecret, async function(err, decoded) {

    if (!err) {
      const {
        fullname,
        tell,
        type,
        rejected_order,
        sub_district,
        district,
        province,
        address_other,
        subscribe_sms,
        subscribe_line,
        activated
      } = req.body

      const rules = {
        fullname: 'required|max:40',
        tell: 'required|min:9|max:10', //unique
        type: 'required|in:enterprise,personal',
        rejected_order: 'required|numeric',
        sub_district: 'integer',
        district: 'integer',
        province: 'integer',
        address_other: 'max:255|string',
        subscribe_sms: 'required|boolean',
        subscribe_line: 'required|boolean',
        activated: 'boolean'
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
        console.log(sub_district);

        const userId = decoded.sub

        const update = await User.update({
          fullname: fullname,
          tell: tell,
          type: type,
          rejected_order: rejected_order<0? 0: rejected_order > 3? 3: rejected_order,
          sub_district: sub_district==undefined? null: sub_district==''? null: sub_district,
          district: district==undefined? null: district==''? null: district,
          province: province==undefined? null: province==''? null: province,
          address_other: address_other==undefined? null: address_other==''? null: address_other,
          subscribe_sms: subscribe_sms,
          subscribe_line: subscribe_line,
          activated: 1,
        }, {
          where: {
            id: userId
          },
        })

        if (update[0] == 1) { // If found id and updated

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

module.exports = EditUserController
