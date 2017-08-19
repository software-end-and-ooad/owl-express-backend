const handler = {

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
  }
}


module.exports = handler
