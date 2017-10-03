import User from '../../models/User'


const Handler = {

  setEmailKMITL: (studentid) =>
  {
    const KMTILEmail = '@kmitl.ac.th';

    if (typeof studentid == 'string')
      studentid.trim()
    if (studentid != undefined) {
      const indexAt = studentid.indexOf('@');
      if ( indexAt > -1 ) { // If str has '@', it will use only string infront '@'
        return studentid.substr(0, indexAt) + KMTILEmail;
      }
      else
        return studentid + KMTILEmail;
    }
  },

  getTokenFormHeader: (authorization) => // Handler for header 'Authorization' to get authen token
  {
    // authorization has checked in app.js, So not to check again
    const bearer = 'bearer'
    const token = authorization.substr(bearer.length).trim()

    return token
  },

  confirmtokenGenerate: async () => {
    let token = ""
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$@&"
    let uniqueToken = ""

    do {
      for (var i = 0; i < 80; i++)
        token += possible.charAt(Math.floor(Math.random() * possible.length));

      // Check unique confirm_token
      uniqueToken = await User.findOne({
        where: {
          confirm_token: token
        },
        attributes: ['id']
      })
    } while (uniqueToken != null)

    return token;
  },

}


module.exports = Handler
