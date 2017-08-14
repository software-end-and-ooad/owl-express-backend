const KMTILEmail = '@kmitl.ac.th';

module.exports = {

  setEmailKMITL: (studentid) => {
    if (typeof studentid == 'string')
      studentid.trim()
    const indexAt = studentid.indexOf('@');

    if ( indexAt > -1 ) { // If str has '@', it will use only string infront '@'
      return studentid.substr(0, indexAt) + KMTILEmail;
    }
    else
      return studentid + KMTILEmail;
  }

}

