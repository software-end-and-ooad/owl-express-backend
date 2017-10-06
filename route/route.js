// Dependency
import express from 'express'

// Other
import api from '../constant/api'

// Controller
import LoginController from '../controller/auth.controller'
import RegisterController from '../controller/register.controller'
import ForgetPasswordController from '../controller/forgetpassword.controller'
import ResetPasswordController from '../controller/resetpassword.controller';

const router = express.Router()


router.post(api.auth, LoginController)

router.post(api.register, RegisterController)

router.post(api.forgetPassword, ForgetPasswordController)

router.post(api.resetPassword, ResetPasswordController)

module.exports = router;
