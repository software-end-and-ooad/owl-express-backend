import jwt from 'jsonwebtoken'
import Validator from 'validatorjs'

import Officer from '../../models/officer';
import Order from '../../models/Order'
import jwtconfig from '../../config/jwtconfig'
import handler from '../handlers/handlers';

function AcceptOrderController(req, res) {

  const header = req.headers['authorization']
  const token = handler.getTokenFormHeader(header) // Get token from authorization

  jwt.verify(token, jwtconfig.adminSecret, async function(err, decoded) {

    if (!err) {
      const { track } = req.body

      const rules = {
        track: 'required',
      };

      const errMessage = {
        required: ':attribute_IS_REQUIRED',
      }

      const validation = new Validator(req.body, rules, errMessage);

      validation.passes(async function() {

        const userId = decoded.sub

        const findPostmanId = await Officer.findOne({
          where: {
            id: userId
          },
          attributes: ['officer_no', 'role']
        })

        if (findPostmanId != null) {  // If found
          const postman_id = findPostmanId.dataValues.officer_no;
          if (findPostmanId.dataValues.role == 'officer') {

            const update = await Order.update({
              postman_id: postman_id
            }, {
              where: {
                track: track
              }
            })


            if (update[0] > 0)  // If found id and updated
              res.status(200).json({ sucess: true })
            else
              res.status(401).json({ sucess: false })
          } else {
              res.status(401).json({ sucess: false })
          }
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

module.exports = AcceptOrderController
