// Dependency
import express from 'express'

// Other
import api from '../constant/api'
import Validatorjs from 'validatorjs'
import OrderPackageController from '../controller/orderPackage.controller';

// Controller
import GetuserController from '../controller/getuser.controller'
import RefreshTokenController from '../controller/refreshToken.controller'

const routerProtect = express.Router()

routerProtect.get(api.auth, GetuserController)

routerProtect.get(api.refresh, RefreshTokenController)

routerProtect.post(api.orderPackage, OrderPackageController)


module.exports = routerProtect;
