import jwt from 'jsonwebtoken'

import User from '../model/User'
import jwtconfig from '../config/jwtconfig'
import handler from './handlers/handlers';

function GetuserController(req, res) {

  const header = req.headers['authorization']
  const token = handler.getTokenFormHeader(header) // Get token from authorization

  jwt.verify(token, jwtconfig.secret, async function(err, decoded) {

    if (!err) {
      const userid = decoded.sub

      const result = await User.findOne({
        where: {
          id: userid
        },
        attributes: ['id', 'email', 'name', 'username', 'password']
      })

      if (result != null) {
        const user = result.dataValues;

        const obj = {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email
        }

        res.status(200).json({ sucess: true, data: obj })
      } else {
        res.status(200).json({ sucess: true, data: {} })
      }

    } else {

      res.status(404).json({ sucess: false, data: err.message })
    }
  });

}

module.exports = GetuserController
