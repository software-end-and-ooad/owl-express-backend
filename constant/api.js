const api = {

  auth: '/login',
  register: '/register',
  refresh: '/refresh',
  forgetPassword: '/forget-password',
  resetPassword: '/reset-password',
  sendActivate: '/send-activate/:email',
  activate: '/activate/:tokenId',
  orderPackage: '/order',
  province: '/province',
  district: '/district/:provinceId',
  subdistrict: '/subdistrict/:districtId',
  getOrderList: '/order-list',
  getAllUser: '/getalluser',
  edituser: '/edituser/:userId',

}


module.exports = api;
