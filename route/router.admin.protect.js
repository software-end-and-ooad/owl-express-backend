// Dependency
import express from 'express'

// Other
import api from '../constant/api'
import Validatorjs from 'validatorjs'

// Controller
//import GetuserController from '../controller/getuser.controller' // Not doing yet
import RefreshTokenController from '../controller/admin/refreshToken.controller'
import GetadminController from '../controller/admin/getadmin.controller';
import GetAllUserController from '../controller/admin/getalluser.controller.js';
import EditUserController from '../controller/admin/edituser.controller.js';
import GetAllOrderController from '../controller/admin/getallorder.controller';
import EditOrderController from '../controller/admin/editorder.controller';
import GetAllOfficerController from '../controller/admin/getallOfficer.controller';
import EditOfficerController from '../controller/admin/editofficer.controller';
import AddOfficerController from '../controller/admin/addOfficer.controller';
import AcceptOrderController from '../controller/admin/acceptOrder.controller';
import RemoveOfficerController from '../controller/admin/removeOfficer.controller';

const routerAdminProtect = express.Router()

//routerAdminProtect.get(api.auth, GetuserController) // Not doing yet

routerAdminProtect.get(api.refresh, RefreshTokenController)

routerAdminProtect.get(api.auth, GetadminController)

routerAdminProtect.get(api.getAllUser, GetAllUserController)

routerAdminProtect.post(api.edituser, EditUserController)

routerAdminProtect.get(api.allOrder, GetAllOrderController)

routerAdminProtect.post(api.editOrder, EditOrderController)

routerAdminProtect.get(api.getAllOfficer, GetAllOfficerController)

routerAdminProtect.post(api.editOfficer, EditOfficerController)

routerAdminProtect.post(api.addOfficer, AddOfficerController)

routerAdminProtect.put(api.acceptOrder, AcceptOrderController)

routerAdminProtect.delete(api.removeOfficer, RemoveOfficerController)

module.exports = routerAdminProtect;
