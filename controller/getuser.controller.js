import jwt from 'jsonwebtoken'

import User from '../model/User'
import jwtconfig from '../config/jwtconfig'

function GetuserController(req, res) {

  const headers = req.headers['authorization']
  const token = headers!=null? req.headers['authorization'].substr('7'): undefined

  jwt.verify(token, jwtconfig.secret, async function(err, decoded) {
    const userid = decoded.sub

    if (!err) {
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
