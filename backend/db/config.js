require('colors');
const { mongoose } = require('mongoose');
const logger = require('../services/logger');
require('dotenv').config();

const connectDB = async () => {
  let db;
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold,
    );

    db = mongoose.connection;

    db.once('open', () => {
      logger.info('MongoDB connected successfully');
    });
    db.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });
  } catch (error) {
    logger.error('Error connecting to MongoDB: ', error.message);
    if (db) {
      db.on('error', (err) => {
        logger.error(`MongoDB connection error: ${err}`);
      });
    }
    process.exit(1); // 1 indicates failure,  0 status code is success
  }
};

module.exports = connectDB;
