const ratingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");
const { default: mongoose } = require("mongoose");

//create Rating

exports.createRating = async (req, res) => {
    try {

        const userId = req.user.id;
        const { rating, review, courseId } = req.body;

        const courseDetails = await Course.findOne({
            _id: courseId,
            studentEnrolled: { $elemMatch: { $eq: userId } }
        });
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in the course"
            });
        }

        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId
        });
        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: "Already Reviewed"
            });
        }

        const ratingReview = await RatingAndReview.create({
            rating,
            review,
            course: courseId,
            user: userId

        });

        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId, {
            $push: {
                ratingAndReviews: ratingAndReview
            },
        }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Rating and review Created Successfully"
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

//average Rating

exports.getAverageRating = async (req, res) => {
    try {
        const { courseId } = req.body;

        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group: {
                    _id: null,
                    averageRating: {
                        $avg: "$rating"
                    },
                }
            }
        ]);
        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            })
        }

        return res.status(200).json({
            success: true,
            message: "Average Rating is 0,No Rating is given till now",
            averageRating: 0
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}



// get All rating

exports.getAllratingAndReviews = async (req, res) => {
    try {
        const allRatingAndReviews = await RatingAndReview.find({})
            .sort({ rating: "desc" })
            .populate({
                path: "user",
                select: "firstName lastName email image"
            })
            .populate({
                path: "course",
                select: "courseName"
            })
            .exec();

        return res.status(200).json({
            sucess: true,
            message: "All reviews fetched successfully",
            data: allRatingAndReviews
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
}
