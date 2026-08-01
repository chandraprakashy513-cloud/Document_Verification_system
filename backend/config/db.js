const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ Full Error:");
        console.error(error); // poora error print hoga
        process.exit(1);
    }
};

module.exports = connectDB;