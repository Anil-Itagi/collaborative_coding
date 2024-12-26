const jwt = require('jsonwebtoken');

function generateTokenAndSetCookie(res, userId) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7h",
    })
    res.cookie("token", token, {
        httpOnly: true,
        secure: 'None',
        sameSite: "strict",
        maxAge: 7 * 60 * 60 * 1000

    })
    return token;
}

module.exports = generateTokenAndSetCookie;