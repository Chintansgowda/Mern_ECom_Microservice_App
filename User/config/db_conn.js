const mongoose = require("mongoose");
require("dotenv").config();

const mongoHost = process.env.MONGO_HOST || "mongo";
const mongoPort = process.env.MONGO_PORT || "27017";
const mongoDb   = process.env.MONGO_DBNAME;

const mongoURL = `mongodb://${mongoHost}:${mongoPort}/${mongoDb}`;

mongoose.connect(mongoURL)
  .then(() => console.log(`MongoDB connected to DB: ${mongoDb}`))
  .catch(err => console.error("Mongo connection error:", err));

module.exports = mongoose;
