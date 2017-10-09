// Dependency
import express from 'express'

// Other
import api from '../constant/api'

// Controller
import LoginController from '../controller/admin/login.controller';

const routerAdmin = express.Router()


routerAdmin.post(api.auth, LoginController)

module.exports = routerAdmin;
