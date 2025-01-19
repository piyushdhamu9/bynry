const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_KEY)
    .then(() => console.log("Database connected"))
    .catch((error) => console.error("Database connection failed:", error));
};

module.exports = { connectDB };
