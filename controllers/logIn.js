const users = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

async function handleLogIn(req, res) {
    try {
        let { email, password } = req.body;
        if (!password || !email) {
            return res.status(400).json({
                message: "Enter details correctly"
            })
        };

        let existingUser = await users.findOne({ email })
        let decodedPassword;

        if (existingUser) {
            decodedPassword = await bcrypt.compare(password, existingUser.password)
        }

        if (!existingUser || !decodedPassword) {
            return res.status(404).json({
                message: "Incorrect Email or Password"
            })
        }

        if (existingUser && decodedPassword) {
            const token = jwt.sign({ userId: existingUser._id, email, name: existingUser.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie("authtoken", token, {
                httpOnly: true,
                sameSite: 'None',
                secure: true,
                maxAge: 60 * 60 * 1000,
                path: "/"
            })
            return res.status(200).json({
                message: "user found",
                token
            })
        }
    } catch (error) {
        console.log("Some Error Occured", error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = handleLogIn;