const { sendMail, sendWelcome, passwordReset, passwordResetSuccessFull } = require("./EmailFunctions.js")

const sendVerificationEmail = async(email, verificationToken) => {

    try {
        sendMail(email, verificationToken)
    } catch (error) {
        throw new Error("Error in sending varification email")
    }
}

const sendWelcomeEmail = async(email, name) => {
    try {
        sendWelcome(email, name)
    } catch (error) {
        throw new Error("Error in sending wellcome email")
    }
}

const sendPasswordReset = async(email, link) => {

    try {
        passwordReset(email, link)
    } catch (error) {
        throw new Error("Error in sending varification email")
    }
}


const passwordResetSuccess = async(email) => {

    try {
        passwordResetSuccessFull(email)
    } catch (error) {
        throw new Error("Error in sending varification email")
    }
}

module.exports = { sendVerificationEmail, sendWelcomeEmail, sendPasswordReset, passwordResetSuccess };