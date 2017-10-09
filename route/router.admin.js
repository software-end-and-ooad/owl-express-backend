// Dependency
import express from 'express'

// Other
import api from '../constant/api'

// Controller
import LoginController from '../controller/admin/login.controller';
import SendActivateController from '../controller/admin/sendactivate.controller';

const routerAdmin = express.Router()

routerAdmin.post(api.auth, LoginController)

routerAdmin.get(api.sendActivate, SendActivateController)

module.exports = routerAdmin;
