const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const verifyToken = async(req, res, next) => {
    const token = req.body.token;
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
        }

        const rootUser = await User.findOne({ _id: decoded._id, "tokens.token": token })
        if (!rootUser) {
            throw new Error("User not found  in VerfyToken")
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        next();
    } catch (error) {
        console.log("Error in token verification:", error.message);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = verifyToken;