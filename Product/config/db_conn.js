const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("../models/productModel");

const mongoHost = process.env.MONGO_HOST || "mongo";
const mongoPort = process.env.MONGO_PORT || "27017";
const mongoDb   = process.env.MONGO_DBNAME || "productdb";

const mongoURL = `mongodb://${mongoHost}:${mongoPort}/${mongoDb}`;

mongoose.connect(mongoURL)
  .then(async () => {
    console.log(`MongoDB connected to DB: ${mongoDb}`);
    await seedProducts();
  })
  .catch(err => console.error("Mongo connection error:", err));

async function seedProducts() {
  const count = await Product.countDocuments();

  if (count > 0) {
    console.log("ℹ️ Products already exist, skipping seed");
    return;
  }

  await Product.insertMany([
    {
      name: "Call of Duty",
      category: "Shooter",
      price: 59,
      image: "https://via.placeholder.com/200",
      description: "Popular FPS game"
    },
    {
      name: "Outlast",
      category: "Horror",
      price: 29,
      image: "https://via.placeholder.com/200",
      description: "Survival horror game"
    },
    {
      name: "Resident Evil",
      category: "Horror",
      price: 49,
      image: "https://via.placeholder.com/200",
      description: "Classic horror franchise"
    }
  ]);

  console.log("🌱 Default products seeded");
}

module.exports = mongoose;
