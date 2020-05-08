const nodemailer = require('nodemailer');
const config = require('../configs/config');

module.exports = async function emailSender(options) {
  // emailSender fn bahar se call hoyega (anyone can use it) therfore module.exports & passed options
  //  1. transport => configuration   // configurations set email
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com', // iss email par nodemailer mail bhejega
    service: 'gmail',
    port: 2525,
    secure: false,
    auth: {
      user: config.EMAIL_ID, // email Id jisse mail bhejoge
      pass: config.EMAIL_PASSWORD, // app password
    },
  });

  // the one who comes to /forgetPassword call this fn
  //2. parameters
  const mailOptions = {
    from: options.from, // options main define hoga from,to,subject etc
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  // 3. sendMail
  await transport.sendMail(mailOptions);
};
