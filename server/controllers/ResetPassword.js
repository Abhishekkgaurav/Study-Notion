// Reset PAssword Token

const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const resetPasswordTemplate = require("../mail/templates/resetPasswordTemplate");

exports.resetPasswordToken = async (req, res) => {
    try {
        const email = req.body.email;

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.json({
                success: false,
                message: "Your Email is not registered"
            });
        }
        const token = crypto.randomUUID();
        const updatedDetails = await User.findOneAndUpdate({ email }, {
            token: token,
            resetPasswordExpires: Date.now() + 5 * 60 * 1000
        }, {
            new: true
        });

        const url = `http://localhost:3000/reset-password/${token}`;

        await mailSender(email, "Password Reset Link", resetPasswordTemplate(url));
        return res.json({
            success: true,
            message: 'Email Sent Successfully',
            url: url
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Something Wrong is reset Password",

        })
    }
}


exports.resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body;

        if (password !== confirmPassword) {
            return res.json({
                success: false,
                message: "Password and Confirm Password is not matched"
            })
        }

        const userDetails = await User.findOne({ token: token });
        console.log("User Details: ", userDetails);
        if (!userDetails) {
            return res.json({
                success: false,
                message: "Token Invalid"
            })
        }
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.json({
                success: false,
                message: "Token is Expired, Please regenerate Token"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.findOneAndUpdate(
            { token: token },
            { password: hashedPassword },
            { new: true });

        return res.status(200).json({
            success: true,
            message: 'Pasword Reset Successful'
        })


    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Something Went Wrong in reset password"
        })

    }
}

