const nodemailer = require('nodemailer');
const pug = require('pug');
const { convert } = require('html-to-text');

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
  // For development with Mailtrap or similar services
  // host: 'sandbox.smtp.mailtrap.io',
  // port: 2525,
  // auth: {
  //   user: 'your-mailtrap-user',
  //   pass: 'your-mailtrap-pass'
  // }
});

// Email template base class
class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.firstName || user.name.split(' ')[0];
    this.url = url;
    this.from = `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`;
  }

  // Create transport (can be overridden for different providers)
  newTransport() {
    return transporter;
  }

  // Send the actual email
  async send(template, subject) {
    try {
      // 1) Render HTML based on a pug template
      const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
        firstName: this.firstName,
        url: this.url,
        subject
      });

      // 2) Define email options
      const mailOptions = {
        from: this.from,
        to: this.to,
        subject,
        html,
        text: convert(html)
      };

      // 3) Create transport and send email
      await this.newTransport().sendMail(mailOptions);
    } catch (err) {
      
    }
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to Our Platform!');
  }

  async sendPasswordReset() {
    await this.send('passwordReset', 'Your password reset token (valid for 10 minutes)');
  }
}

// Simple email sending function (alternative to class-based approach)
const sendEmail = async (options) => {
  try {
    // 1) Define email options
    const mailOptions = {
      from: process.env.EMAIL_FROM_ADDRESS,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html
    };

    // 2) Send email
    await transporter.sendMail(mailOptions);
  } catch (err) {
    
  }
};

// Email templates (Pug templates would be in views/email directory)
/*
Example welcome.pug:
doctype html
html
  head
    meta(charset='UTF-8')
    title= subject
  body
    h1 Hi #{firstName},
    p Welcome to our platform! We're glad to have you 🎉🙏
    p Your account has been successfully created.
    p - The Team
*/

module.exports = {
  Email,
  sendEmail
};