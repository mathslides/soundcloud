// emailVerify.js
const nodemailer = require('nodemailer'); 

const emailVerify = async (req, res) => {
  try {
    let testaccount = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure : true,
      auth: {
        user: 'arslanmanqsood425@gmail.com',
        pass: 'arslan123'
      }
    });
    const mailOptions = {
      from: 'arslanmanqsood425@gmail.com',
      to: 'arslanvirk274@@gmail.com',
      subject: 'Testing',
      text: 'your email body content here',
      html: `
       <h1>Verification Email</h1>
       <p>System email for testing</p>
      `,
      attachments: [
        {
          filename: 'image.png',
          path: '<https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png>'
        }
      ]
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        res.status(500).send({ message: 'Email sending failed' });
      } else {
        console.log('Email sent: ');
        res.send({ message: 'Email sent successfully' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Email sending failed' });
  }
};

module.exports = emailVerify;