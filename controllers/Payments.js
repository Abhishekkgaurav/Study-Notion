const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");

const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");

// capture the payment and initiate the razorpay order

exports.capturePayment = async (req, res) => {
    try {
        const { course_id } = req.body;
        const userId = req.user.id;

        if (!course_id) {
            return res.json({
                success: false,
                message: 'Please Provide valid Credentials'
            });
        }
        let course;
        try {
            course = await Course.findById(course_id);
            if (!course) {
                return res.json({
                    success: false,
                    message: 'Could not find the Course'
                });
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if (course.studentEnrolled.includes(uid)) {
                return res.status(200).json({
                    success: false,
                    message: 'Student is Already Enrolled'
                });
            }

            const amount = course.price;
            const currency = "INR";
            const options = {
                amount: amount * 100,
                currency,
                receipt: Math.random(Date.now()).toString(),
                notes: {
                    courseId: course_id,
                    userId,
                }

            };

            try {
                const paymentResponse = await instance.orders.create(options);
                console.log(paymentResponse);
            } catch (err) {
                console.log(err);
                res.json({
                    success: false,
                    message: 'Could not initiate order'
                })
            }


        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: err.message
            });

        }


    } catch (err) {

    }
};