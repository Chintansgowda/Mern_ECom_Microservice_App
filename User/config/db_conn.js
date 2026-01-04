const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("../models/userModel");

const mongoHost = process.env.MONGO_HOST || "mongo";
const mongoPort = process.env.MONGO_PORT || "27017";
const mongoDb   = process.env.MONGO_DBNAME || "userdb";

const mongoURL = `mongodb://${mongoHost}:${mongoPort}/${mongoDb}`;

mongoose.connect(mongoURL)
  .then(async () => {
    console.log(`✅ MongoDB connected to DB: ${mongoDb}`);
    await seedUser();
  })
  .catch(err => console.error("❌ Mongo connection error:", err));

async function seedUser() {
  const count = await User.countDocuments();

  if (count > 0) {
    console.log("ℹ️ Users already exist, skipping seed");
    return;
  }

  const hashedPassword = await bcrypt.hash("demo1234", 10);

  await User.create({
    firstName: "Demo",
    lastName: "User",
    email: "demo@gmail.com",
    password: hashedPassword,
    age: 25,
    phone: "9999999999",
    gender: "male"
  });

  console.log("🌱 Default user seeded");
  console.log("👉 Email: demo@gmail.com | Password: demo1234");
}

module.exports = mongoose;
