const Profile = require("../models/Profile");
const User = require("../models/User");


exports.updateProfile = async (req, res) => {
    try {
        const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
        const id = req.user.id;
        if (!contactNumber || !gender) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;

        const profileDetails = await Profile.findById(profileId);

        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;

        await profileDetails.save();
        return res.status(200).json({
            success: true,
            message: 'Profile Details Updated Successfully'
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Something Went Wrong During Updating Profile'
        });

    }
}


exports.deleteAccount = async (req, res) => {
    try {
        const id = req.user.id;

        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: 'User Not found'
            });
        }

        await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

        await User.findByIdAndDelete({ _id: id });

        return res.status(200).json({
            success: true,
            message: 'Your Account Deleted Successfully'
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Something Went Wrong During deleting Profile',
            error: err.message
        })
    }
}


exports.getAllUserDetails = async (req, res) => {
    try {

        const id = req.user.id;
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        return res.status(200).json({
            success: true,
            message: 'User Data Fetched Succesfully',
            data: userDetails
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Something Went Wrong During Getting All User Data'
        });
    }
}