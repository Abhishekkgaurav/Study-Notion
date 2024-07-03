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

        const categoryDetails = await Tag.create({
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
        const allCategories = await Tag.find({}, { name: true, description: true });
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