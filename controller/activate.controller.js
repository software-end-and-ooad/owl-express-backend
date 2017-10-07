import User from '../models/User';

import Handler from './handlers/handlers';


async function ActivateController(req, res) {
  const {
    tokenId // Confirm_token
  } = req.params

  const update = await User.update({
    activated: 1,
    confirm_token: await Handler.confirmtokenGenerate()
  },{
    where: {
      confirm_token: tokenId
    }})

  if (update[0] == 1) { // If found email and updated
    console.log('Updated');
    res.status(200).json({ success: true })
  } else {
    console.log('Cannot update');
    res.status(401).json({ success: false })
  }

}

module.exports = ActivateController;


