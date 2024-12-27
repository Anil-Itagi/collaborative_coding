const nodemailer = require("nodemailer");
const { VERIFICATION_EMAIL_TEMPLATE, SEND_WELLCOME_EMAIL,PASSWORD_RESET_REQUEST_TEMPLATE ,PASSWORD_RESET_SUCCESS_TEMPLATE} = require("./emailTemplates");


const OWNER_EMAIL = process.env.MAIL_OWNER_EMAIL;
const OWNER_PASSWORD = process.env.MAIL_OWNER_PASSWORD;

const transporter = nodemailer.createTransport({
    port:587,
    service: 'gmail', // You can use other services like Yahoo, Outlook, etc.
    auth: {
        user: OWNER_EMAIL, // Your email address
        pass: OWNER_PASSWORD // Your email password or app-specific password
    }
});

async function sendMail(email,verificationToken) {
    const message={
  
        to: email, // List of recipients
        subject: 'Email Verificaton', // Subject line
        text: 'This is a plain-text message sent from Node.js!', // Plain text body
        html:  VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
    }
    const info = transporter.sendMail(message);
}


async function sendWelcome(email,name) {
    const message={
     
        to: email, // List of recipients
        subject: 'Wellcome Email', // Subject line
        text: 'This is a plain-text message sent from Node.js!', // Plain text body
        html:  SEND_WELLCOME_EMAIL.replace("{userName}", name),
    }
    const info = transporter.sendMail(message);
}

async function passwordReset(email, link) {
    const message={    
        to: email, // List of recipients
        subject: 'Password Reset', // Subject line
        text: 'This is a plain-text message sent from Node.js!', // Plain text body
        html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", link),
    }
    const info = transporter.sendMail(message);
}

async function passwordResetSuccessFull(email) {
    const message={
        to: email, // List of recipients
        subject: 'Password Reset Success', // Subject line
        text: 'This is a plain-text message sent from Node.js!', // Plain text body
        html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    }
    const info = transporter.sendMail(message);
}

module.exports = { sendMail ,sendWelcome,passwordReset,passwordResetSuccessFull};