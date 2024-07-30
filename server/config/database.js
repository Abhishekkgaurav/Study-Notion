const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("Database Connected Successfully");
        })
        .catch(err => {
            console.log(err);
            console.log("Database Connection Error");
            process.exit(1);
        })
};

