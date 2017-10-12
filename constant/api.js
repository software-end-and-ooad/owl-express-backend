const api = {

  auth: '/login',
  register: '/register',
  refresh: '/refresh',
  forgetPassword: '/forget-password',
  resetPassword: '/reset-password',
  sendActivate: '/send-activate/:email',
  activate: '/activate/:tokenId',
  orderPackage: '/order',

}


module.exports = api;
