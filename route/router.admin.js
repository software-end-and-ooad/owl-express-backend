// Dependency
import express from 'express'

// Other
import api from '../constant/api'

// Controller
import LoginController from '../controller/admin/login.controller';
import SendActivateController from '../controller/admin/sendactivate.controller';
import ResetPasswordController from '../controller/admin/activate.controller';

const routerAdmin = express.Router()

routerAdmin.post(api.auth, LoginController)

routerAdmin.get(api.sendActivate, SendActivateController)

routerAdmin.post(api.resetPassword, ResetPasswordController) // Activate admin is the same function of reset password

module.exports = routerAdmin;
