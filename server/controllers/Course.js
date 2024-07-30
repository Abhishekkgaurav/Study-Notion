const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");


//create Course

exports.createCourse = async (req, res) => {
    try {
        const { courseName, courseDescription, whatYouWillLearn, price, category } = req.body;

        const thumbnail = req.files.thumbnailImage;
        // validation

        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail) {
            return res.status(400).json({
                success: false,
                message: 'All Fields are required'
            });
        }
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log('Instructor Details', instructorDetails);

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: 'instructor Details not found'
            })
        }

        // check category
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: 'Category Details not found'
            })
        }
        const thumbnaiilImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            category: categoryDetails._id,
            thumbnail: thumbnaiilImage.secure_url
        })

        //add new course in user

        await User.findByIdAndUpdate({ _id: instructorDetails._id }, {
            $push: {
                courses: newCourse._id
            }
        }, { new: true });
        await Category.findByIdAndUpdate({ _id: categoryDetails._id }, {
            $push: {
                course: newCourse._id
            }
        }, { new: true });

        return res.status(200).json({
            success: true,
            message: 'Course Created Successfully',
            data: newCourse
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Course Creation Failed',
            error: err.message
        });
    }
}

exports.showAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({}, {
            courseName: true,
            price: true,
            thumbnail: true,
            instructor: true,
            ratingAndReviews: true,
            studentEnrolled: true
        }).populate("instructor")
            .exec();

        return res.status(200).json({
            success: true,
            message: 'Data for all courses fetched successfully',
            data: allCourses

        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Something Went Wrong in Getting All Courses',
            error: err.message
        });
    }
}

exports.getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;
        const courseDetails = await Course
            .find({ _id: courseId })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails"
                }
            })
            .populate("category")
            // .populate("ratingAndReview")
            .populate({
                path: "courseContent",
                populate: "subSection"
            })
            .exec();
        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not Find the course with Course Id: ${courseId}`
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Course Details Fetched Successfully',
            data: courseDetails
        });


    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}