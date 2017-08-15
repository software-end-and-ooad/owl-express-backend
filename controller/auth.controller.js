import AuthenticationRequest from './handlers/authentication-request'
import sequelize from '../config/dbconfig';
import User from '../model/User'

function LoginController(req, res) {
  const studentid = req.body.email;
  const password = req.body.password;
  const emailKMITL = AuthenticationRequest.setEmailKMITL(studentid) //set to studentid@kmtil.ac.th


/*
 *  mysql.query(`SELECT id, email, username, name, password from users where email='${emailKMITL}'`, (error, results, fields) => {
 *
 *    if (results != undefined && results.length > 0) {
 *      if (passwordHash.verify(password, results[0].password) == true) {
 *
 *        // Set user properties into obj
 *        const obj = {
 *          id: results[0].id,
 *          email: results[0].email,
 *          username: results[0].username,
 *          name: results[0].name
 *        }
 *        const token = jwt.sign({
 *          iss: 'https://webserv.kmtil.ac.th'
 *        }, secretJWT);
 *
 *        res.status(200).json({ success: true, data: obj, token: token })
 *      }
 *      else
 *        res.status(401).json({ sucess: false, data: 'INVALID_CREDENTIALS' })
 *    }
 *    else
 *      res.status(401).json({ sucess: false, data: 'INVALID_CREDENTIALS' })
 *  })
 */

}

module.exports = LoginController;

