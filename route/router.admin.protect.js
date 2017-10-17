// Dependency
import express from 'express'

// Other
import api from '../constant/api'
import Validatorjs from 'validatorjs'

// Controller
//import GetuserController from '../controller/getuser.controller' // Not doing yet
import RefreshTokenController from '../controller/admin/refreshToken.controller'
import GetadminController from '../controller/admin/getadmin.controller';

const routerAdminProtect = express.Router()

//routerAdminProtect.get(api.auth, GetuserController) // Not doing yet

routerAdminProtect.get(api.refresh, RefreshTokenController)

routerAdminProtect.get(api.auth, GetadminController)


module.exports = routerAdminProtect;
