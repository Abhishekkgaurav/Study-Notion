const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");

exports.auth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.body.token || req.header("Authorisation").replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token is missing'
            })
        }
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;


        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            });
        }
        next();

    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Something Went Wrong"
        })
    }
}


exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== 'Student') {
            return res.status(401).json({
                success: false,
                message: "This is protected route for Students only"
            })
        }
        next();


    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User Role cannot be verified, Please try again"
        })
    }
}


exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== 'Instructor') {
            return res.status(401).json({
                success: false,
                message: "This is protected route for Instructors only"
            })
        }
        next();


    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User Role cannot be verified, Please try again"
        })
    }
}


exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== 'Admin') {
            return res.status(401).json({
                success: false,
                message: "This is protected route for Admins only"
            })
        }
        next();


    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User Role cannot be verified, Please try again"
        })
    }
}