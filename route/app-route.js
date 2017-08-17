// Dependency
import express from 'express'

// Other
import api from '../constant/api'
import Validatorjs from 'validatorjs'

// Controller
import LoginController from '../controller/auth.controller'
import RegisterController from '../controller/register.controller'
import GetuserController from '../controller/getuser.controller'

const router = express.Router()


router.post(api.auth, LoginController)

router.get(api.auth, GetuserController)

router.post(api.register, RegisterController)



router.get('/*', function (req, res) {
  res.status(404).send('NOT FOUND')
})

module.exports = router;
