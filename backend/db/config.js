const { mongoose } = require("mongoose");
const colors = require("colors");

require('dotenv').config()

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
    );
    const db = mongoose.connection;
    
    db.once("open", () => {
      logger.info("MongoDB connected successfully");
    });
    db.on("disconnected", () => {
      logger.warn("MongoDB disconnected");
    });
  } catch (error) {
    console.log("Error connection to MongoDB: ", error.message);
    db.on("error", (error) => {
      logger.error(`MongoDB connection error: ${error}`);
    });
    process.exit(1); // 1 is failure, 0 status code is success
  }
};

module.exports = connectDB;
