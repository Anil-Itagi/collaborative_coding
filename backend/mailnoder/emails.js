const { sendMail, sendWelcome, passwordReset, passwordResetSuccessFull } = require("./EmailFun.js");

const sendVerificationEmail = async (email, verificationToken) => {
    try {
        await sendMail(email, verificationToken); // Ensure await is used for async calls
        console.log(`Verification email sent successfully to ${email}`);
    } catch (error) {
        console.error(`Error sending verification email to ${email}:`, error.message);
        throw new Error("Error in sending verification email. Please try again later.");
    }
};

const sendWelcomeEmail = async (email, name) => {
    try {
        await sendWelcome(email, name);
        console.log(`Welcome email sent successfully to ${email}`);
    } catch (error) {
        console.error(`Error sending welcome email to ${email}:`, error.message);
        throw new Error("Error in sending welcome email. Please try again later.");
    }
};

const sendPasswordReset = async (email, link) => {
    try {
        await passwordReset(email, link);
        console.log(`Password reset email sent successfully to ${email}`);
    } catch (error) {
        console.error(`Error sending password reset email to ${email}:`, error.message);
        throw new Error("Error in sending password reset email. Please try again later.");
    }
};

const passwordResetSuccess = async (email) => {
    try {
        await passwordResetSuccessFull(email);
        console.log(`Password reset success email sent successfully to ${email}`);
    } catch (error) {
        console.error(`Error sending password reset success email to ${email}:`, error.message);
        throw new Error("Error in sending password reset success email. Please try again later.");
    }
};

module.exports = { sendVerificationEmail, sendWelcomeEmail, sendPasswordReset, passwordResetSuccess };
