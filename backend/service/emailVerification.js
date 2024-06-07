const db = require('../db/models');
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

async function createEmailEntry(body) {
  try {
    const code = Math.floor(Math.random() * 1000000);
    const expiredAt = new Date();
    expiredAt.setMinutes(expiredAt.getMinutes() + 2);
    const payload = {
      ...body,
      code,
      expiredAt,
    };
    const data = await db.EmailVerification.create(payload);
    const email = await emailVerify(payload)
    return data;
  } catch (error) {
    throw error;
  }
}

async function getEmailEntries() {
  try {
    const data = await db.EmailVerification.findAll({ limit: 10 })
    return data
  } catch (error) {
    throw error;
  }
}

async function deleteEmailEntry(code) {
  try {
    const verify = await EmailVerification.findByPk(code);
    if (!verify) {
      throw new Error('EmailVerification not found');
    }

    await verify.destroy();
    return { message: 'EmailVerification deleted successfully' };
  } catch (error) {
    throw error;
  }
}

async function updateEmailEntry(code, updatedFields) {
  try {
    const updat = await EmailVerification.findByPk(code);
    if (!updat) {
      throw new Error('EmailVerification not found');
    }

    await updat.update(updatedFields);
    return updat;
  } catch (error) {
    throw error;
  }
}


const emailVerify = async (payload) => {

  
  const transporter = nodemailer.createTransport({
    host: 'pro8.taxiappsdemo.com',
    port: 465, 
    secure: true,
    auth: {
      user: 'deactivate@taxiappsdemo.com',
      pass: 'MBbt35PiV3x9P'
    }
  });

  const mailOptions = {
    from: '"UBER APP PRO" <deactivate@taxiappsdemo.com>',
    to : payload.email,
    subject: 'Test Email',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verification Email</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333333;
          }
          p {
            color: #666666;
          }
          .verification-code {
            display: inline-block;
            padding: 10px 20px;
            font-size: 24px;
            font-weight: bold;
            color: #ffffff;
            background-color: #007bff;
            border-radius: 8px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Verification Email</h1>
          <p>Hello,</p>
          <p>This email is to verify your account. Please use the following verification code:</p>
          <!-- Insert your 6-digit verification code here -->
          <div class="verification-code">${payload.code}</div>
          <p>If you did not request this verification, please disregard this email.</p>
          <p>Thank you.</p>
        </div>
      </body>
      </html>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {
  createEmailEntry,
  getEmailEntries,
  deleteEmailEntry,
  updateEmailEntry,
  emailVerify
};
