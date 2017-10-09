import User from '../../models/User'
import EgmailConfig from '../../config/emailConfig';
import nodemailer from 'nodemailer';
import passwordHash from 'password-hash'


const Handler = {

  getTokenFormHeader: (authorization) => // Handler for header 'Authorization' to get authen token
  {
    // authorization has checked in app.js, So not to check again
    const bearer = 'bearer'
    const token = authorization.substr(bearer.length).trim()

    return token
  },

  confirmtokenGenerate: async () => {
    let token = ""
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$@"
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

  sendMail: (dest, subject, content) => {
    nodemailer.createTestAccount((err, account) => {
      const transporter = nodemailer.createTransport(EgmailConfig);
      const mailOptions = {
        from: EgmailConfig.auth.user,
        to: dest,
        subject: subject,
        html: content
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
      });
    });
  },

  genPassword: (password) => {
    const pwd = passwordHash.generate(password)
    return pwd
  }

}


module.exports = Handler
