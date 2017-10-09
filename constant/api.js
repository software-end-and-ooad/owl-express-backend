const api = {

  auth: '/login',
  register: '/register',
  refresh: '/refresh',
  forgetPassword: '/forget-password',
  resetPassword: '/reset-password:tokenId',
  sendActivate: '/send-activate/:email',
  activate: '/activate/:tokenId'

}


module.exports = api;
