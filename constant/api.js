const api = {

  auth: '/login',
  register: '/register',
  refresh: '/refresh',
  forgetPassword: '/forget-password',
  resetPassword: '/reset-password',
  sendActivate: '/send-activate/:email',
  activate: '/activate/:tokenId',
  orderPackage: '/order',
  province: '/province/:provinceId?',
  district: '/district/:provinceId/:districtId?',
  subdistrict: '/subdistrict/:districtId/:subdistrictId?',
  getOrderList: '/order-list',
  getAllUser: '/getalluser',
  edituser: '/edituser',
  allOrder: '/allorder',
  editOrder: '/editorder',
  getAllOfficer: '/getallofficer',
  editOfficer: '/editofficer',

}


module.exports = api;
