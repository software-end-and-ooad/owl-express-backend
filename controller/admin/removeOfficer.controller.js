import jwt from 'jsonwebtoken'

import Officer from '../../models/officer';
import Handler from '../handlers/handlers';
import jwtconfig from '../../config/jwtconfig';



async function RemoveOfficerController(req, res) {
  const header = req.headers['authorization']
  const token = Handler.getTokenFormHeader(header) // Get token from authorization
  const email = req.params.email

  jwt.verify(token, jwtconfig.secret, async function(err, decoded) {

    if (email != undefined && email != null) {
      const deleteRow = await Officer.destroy({
        where: {
          email: email
        }})

      if (deleteRow == 1) { // If found email and deleted
        console.log('Deleted');
        res.status(200).json({ success: true })
      } else {
        console.log('Cannot delete row');
        res.status(401).json({ success: false })
      }

    } else {

      res.status(400).json({ success: false })
    }

  });

}

module.exports = RemoveOfficerController;
