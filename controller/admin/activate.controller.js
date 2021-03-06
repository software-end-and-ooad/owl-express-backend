import passwordHash from 'password-hash'
import Officer from '../../models/officer';

import Handler from '../handlers/handlers';



async function ActivateAdminController(req, res) {
  const {
    password,
    token // Confirm_token
  } = req.body

  const update = await Officer.update({
    password: passwordHash.generate(password),
    confirm_token: await Handler.confirmtokenGenerate(),
    officer_no: await Handler.genOfficerNumber()
  },{
    where: {
      confirm_token: token
    }})

  if (update[0] == 1) { // If found email and updated
    console.log('Updated');
    res.status(200).json({ success: true })
  } else {
    console.log('Cannot update');
    res.status(401).json({ success: false })
  }

}

module.exports = ActivateAdminController;
