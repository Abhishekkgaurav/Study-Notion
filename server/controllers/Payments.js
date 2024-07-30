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
                return res.status(200).json({
                    success: true,
                    courseName: course.courseName,
                    courseDescription: course.courseDescription,
                    thumbnail: course.thumbnail,
                    orderid: paymentResponse.id,
                    currency: paymentResponse.currency,
                    amount: paymentResponse.amount
                });
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
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Something Went Wrong'
        })

    }
};


exports.verifySignature = async (req, res) => {
    const webhookSecret = "12345678";
    const signature = req.headers('x-razorpay-signature');

    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (signature === digest) {
        console.log('Payment is Authorised');

        const { courseId, userId } = req.body.payload.entity.notes;

        try {
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentEnrolled: userId } },
                { new: true }
            );
            if (!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    message: 'Course not Found'
                });
            }
            console.log(enrolledCourse);

            const enrolledStudent = User.findOneAndUpdate(
                { _id: userId },
                { $push: { courses: courseId } },
                { new: true }
            );
            console.log(enrolledStudent);

            const emailResponse = await mailSender(
                enrolledStudent.email,
                "Congratulations",
                "Congratulations, You are successfully registered in the course"
            );
            console.log(emailResponse);
            return res.status(200).json({
                success: true,
                message: 'Signature Verified and Course Added'
            });


        } catch (err) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }

    else {
        return res.status(400).json({
            success: false,
            message: "Invalid Request"
        });
    }


}