// Dependency
import express               from 'express'

// Other
import api                   from '../constant/api'
import Validatorjs           from 'validatorjs'

// Controller
import LoginController       from '../controller/auth.controller'

const router = express.Router()


router.post(api.auth, LoginController)

router.post(api.register, function (req, res) {

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

  let validation = new Validatorjs(req.body, rules);
  validation.passes(function () {
    res.status(200).json({ sucess: true, data: undefined })
  });
  validation.fails(function () {
    res.status(400).send(validation.errors);
  });


})


router.get('/*', function (req, res) {
  res.status(404).send('NOT FOUND')
})

module.exports = router;
