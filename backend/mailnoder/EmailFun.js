const nodemailer = require("nodemailer");
const {
    VERIFICATION_EMAIL_TEMPLATE,
    SEND_WELLCOME_EMAIL,
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE
} = require("./emailTemplates");

const OWNER_EMAIL = process.env.MAIL_OWNER_EMAIL;
const OWNER_PASSWORD = process.env.MAIL_OWNER_PASSWORD;

// Configure the transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Gmail's SMTP host
    port: 587,
    secure: false, // Use STARTTLS
    auth: {
        user: OWNER_EMAIL, // Your email address
        pass: OWNER_PASSWORD, // App-specific password
    },
});

async function sendMail(email, verificationToken) {
    try {
        const message = {
            to: email, // Recipient email
            subject: "Email Verification", // Subject line
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken), // HTML body
        };

        const info = await transporter.sendMail(message);
        console.log(`Email sent: ${info.response}`);
    } catch (error) {
        console.error(`Error sending email: ${error.message}`);
    }
}

async function sendWelcome(email, name) {
    try {
        const message = {
            to: email,
            subject: "Welcome Email",
            html: SEND_WELLCOME_EMAIL.replace("{userName}", name),
        };

        const info = await transporter.sendMail(message);
        console.log(`Welcome email sent: ${info.response}`);
    } catch (error) {
        console.error(`Error sending welcome email: ${error.message}`);
    }
}

async function passwordReset(email, link) {
    try {
        const message = {
            to: email,
            subject: "Password Reset",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", link),
        };

        const info = await transporter.sendMail(message);
        console.log(`Password reset email sent: ${info.response}`);
    } catch (error) {
        console.error(`Error sending password reset email: ${error.message}`);
    }
}

async function passwordResetSuccessFull(email) {
    try {
        const message = {
            to: email,
            subject: "Password Reset Success",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        };

        const info = await transporter.sendMail(message);
        console.log(`Password reset success email sent: ${info.response}`);
    } catch (error) {
        console.error(`Error sending password reset success email: ${error.message}`);
    }
}

module.exports = { sendMail, sendWelcome, passwordReset, passwordResetSuccessFull };