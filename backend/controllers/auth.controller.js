const User = require('../models/user.model.js')
const bcryptjs = require("bcryptjs")

require('dotenv').config();

const crypto = require("crypto")
const generateTokenAndSetCookie = require('../utils/generateTokenAndSetCookie.js')
const {
    sendVerificationEmail,
    sendWelcomeEmail,
    sendPasswordReset,
    passwordResetSuccess
} = require('../mailnoder/emails.js')

const BASE_FRONTED_URL = process.env.FRONTEND_URL;


const signup = async(req, res) => {
    const { email, password, name } = req.body;
    console.log(email, password);
    // return res.status(400).json({ success: false, message: "User already exists" })
    try {

        //const { email, username, password } = req.body;

      
        // Create a new user
        const newUser = new User({ email, name, password });
        
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

const verifyEmail = async(req, res) => {

    const { code, email } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            email: email,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid or expired verification code" })
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();
        await sendWelcomeEmail(user.email, user.name);

       
        res.status(201).json({
            success: true,
            message: "Welcome email sent successfully",
        });

    } catch (err) {
        return res.status(400).json({ success: false, message: error.message })
    }
}
const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            email
        })
      

        if (!user) {
            return res.status(400).json({ success: false, message: "The email is not exists" })
        }
        if (!user.isVerified) {

              await User.deleteOne({ email });

              return res.status(400).json({ success: false, message: "User is not verified , Signup Again" })
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Incurrect Password" })
        }

        const token = generateTokenAndSetCookie(res, user._id);
        user.lastLogin = new Date();
        await user.save();

        res.cookie("token1", token, {
            expires: new Date(Date.now() + 7 * 60 * 60 * 1000),
            httpOnly: true,
        });

        res.status(200).json({
            success: true,
            message: "User login successfully",
            user: {

                ...user._doc,
                password: undefined,
            },
            token: token,

        })

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })

    }
}
const logout = async(req, res) => {
    res.clearCookie("token1");
    res.status(200).json({ success: true, message: "Logged out successfully" })
}

const forgotPassword = async(req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "The email is not exists" })
        }
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();
        console.log(BASE_FRONTED_URL+" in controoler");
        await sendPasswordReset(user.email, `${BASE_FRONTED_URL}/api/reset-password/${resetToken}`);
        console.log("reset password link sent successfully");
        res.status(201).json({
            success: true,
            message: "reset password link sent  successfully",
        });

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })

    }
}

const resetPassword = async(req, res) => {
    try {
        const {
            token
        } = req.params;
        const { password } = req.body;
        console.log(token);
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        })
        console.log(user)
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired reset token" })
        }

        const hashedPassword = await bcryptjs.hash(password, 10)

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        await passwordResetSuccess(user.email);
        console.log("reset password successfully");
        res.status(201).json({
            success: true,
            message: "reset password  successfully",
        });

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })

    }
}

const checkAuth = async(req, res) => {
    const token = req.cookies.token;
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }
        res.status(200).json({ success: true, user, token: token })
    } catch (error) {
        console.log("Error in check auth", error);
        return res.status(400).json({ success: false, message: error.message });
    }
    1
}
module.exports = { signup, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth }