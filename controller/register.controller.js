import Validator from 'validatorjs'

async function RegisterController(req, res) {
  const {
    name,
    role,
    email,
    domain,
    studentid,
    faculty,
    password,
    repassword
  } = req.body;

  const rules = {
    name: 'required',
    role: 'required',
    email: 'required',
    domain: 'required',
    studentid: 'required',
    faculty: 'required',
    password: 'required',
    repassword: 'required'
  };

  const validation = new Validator(req.body, rules);

  validation.passes(function () {
    res.status(200).json({ sucess: true, data: undefined })
  });
  validation.fails(function () {
    res.status(400).json(validation.errors);
  });

}

module.exports = RegisterController
