import User from '../models/User';

import Handler from './handlers/handlers';


async function ForgetPasswordController(req, res) {
  const email = req.body.email // Destination email
  const port = process.env.PORT || 3000;
  const token = await Handler.confirmtokenGenerate()
  const url = `http://localhost:${port}/api/resetpassword/${token}`

  const content = `<a href="${url}">Click here to reset password</a>`

  const update = await User.update({
    confirm_token: 'boss'
  },{
    where: {
      email: email
    }})

  if (update[0] == 1) { // If found email and updated

    console.log('Sending email ...');
    Handler.sendMail(email, 'Owl-express: Forget Password', content)

    res.status(200).json({ data: true })
  } else { // Not found email and will not send email

    res.status(401).json({ data: false })
  }
}

module.exports = ForgetPasswordController;

