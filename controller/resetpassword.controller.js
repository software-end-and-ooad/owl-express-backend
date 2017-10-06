import passwordHash from 'password-hash'
import User from '../models/User';

import Handler from './handlers/handlers';


async function ResetPasswordController(req, res) {
  const {
    password,
    token // Confirm_token
  } = req.body

  const update = await User.update({
    password: passwordHash.generate(password),
    confirm_token: await Handler.confirmtokenGenerate()
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

module.exports = ResetPasswordController;

