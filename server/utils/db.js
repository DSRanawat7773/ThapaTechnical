const mongoose = require("mongoose");

// mongoose.connect(URI);?

const URI = process.env.MONGODB_URI;
const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log('Connnected Successfully to DB');
    } catch (error) {
        console.log("Databse connection failed");
        process.exit(0);
    }
}

module.exports = connectDb;