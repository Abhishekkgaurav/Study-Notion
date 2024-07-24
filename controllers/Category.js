const Category = require("../models/Category");


exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const categoryDetails = await Category.create({
            name: name,
            description: description
        });
        console.log(categoryDetails);
        return res.status(200).json({
            success: true,
            message: 'Category created Successfully'
        })


    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


exports.showAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find({}, { name: true, description: true });
        return res.status(200).json({
            success: true,
            message: 'All Categories Returned Successfully',
            allCategories
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.categoryPagedetails = async (req, res) => {
    try {
        const { categoryId } = req.body;

        const selectedcategory = await Category.findById(categoryId)
            .populate("courses")
            .exec();

        if (!selectedcategory) {
            return res.status(404).json({
                success: false,
                message: "Data Not found"
            });
        }

        const diffrentCategories = await Category.find({
            _id: { $ne: categoryId },

        })
            .populate("courses")
            .exec();

        return res.status(200).json({
            success: true,
            data: {
                selectedcategory, diffrentCategories
            }
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}