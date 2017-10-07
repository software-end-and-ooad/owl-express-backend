// Dependency
import express from 'express'

// Other
import api from '../constant/api'

// Controller
import LoginController from '../controller/auth.controller'
import RegisterController from '../controller/register.controller'
import ForgetPasswordController from '../controller/forgetpassword.controller'
import ResetPasswordController from '../controller/resetpassword.controller';
import ActivateController from '../controller/activate.controller';
import SendActivateController from '../controller/sendactivate.controller';

const router = express.Router()


router.post(api.auth, LoginController)

router.post(api.register, RegisterController)

router.post(api.forgetPassword, ForgetPasswordController)

router.post(api.resetPassword, ResetPasswordController)

router.get(api.activate, ActivateController)

router.get(api.sendActivate, SendActivateController)

module.exports = router;
