const ratingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");

//create Rating

exports.createRating = async (req, res) => {
    try {

        const userId = req.user.id;
        const { rating, review, courseId } = req.body;

        const courseDetails = await Course.findOne({
            _id: courseId,
            studentEnrolled:
        })


    } catch (err) {

    }
}

//average Rating

// get All rating
