import User from '../models/User';

import Handler from './handlers/handlers';


async function SendActivateController(req, res) {
  const token = await Handler.confirmtokenGenerate()
  const url = `http://localhost:4200/activate/${token}`
  const email = req.params.email
  console.log(email);

  const content = `<a href="${url}">Click here to activate account</a>`

  const update = await User.update({
    confirm_token: token
  },{
    where: {
      email: email
    }})

  if (update[0] == 1) { // If found email and updated

    console.log('Sending email ...');
    Handler.sendMail(email, 'Owl-express: Activate Account', content)

    res.status(200).json({ data: true })
  } else { // Not found email and will not send email

    res.status(401).json({ data: false })
  }
}

module.exports = SendActivateController;

