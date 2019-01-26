var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sven.struan@finlay-consult.com',
    pass: 'Dreadnought21.'
  }
});

var mailOptions = {
  from: 'sven.struan@finlay-consult.com',
  to: 'ssf6@st-andrews.ac.uk',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
