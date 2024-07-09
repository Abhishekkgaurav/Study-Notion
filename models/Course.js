const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,

    },
    courseDescription: {
        type: String,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    whatYouWillLearn: {
        type: String,
    },
    courseContent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section"
    }],
    ratingAndReviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReview"
    }],
    price: {
        type: Number,

    },
    thumbnail: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    tag: {
        type: [String],
        required: true
    },
    studentEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }]
});

module.exports = mongoose.model("Course", courseSchema);