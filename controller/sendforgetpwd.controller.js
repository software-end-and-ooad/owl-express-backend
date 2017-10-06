import passwordHash from 'password-hash'


async function SendForgetPasswordController(req, res) {
  console.log(req.body.email)

  // send mail 

  res.status(200).json({ data: true })
}

module.exports = SendForgetPasswordController;

