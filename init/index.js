const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

//MONGO_DB SE CONNECTION KA CHIJ H YHA PE
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({}); //PURANA DATA DELETE KARTA H
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "68ae8cdc94054116bee8f655",
  }));
  await Listing.insertMany(initData.data); //SAMPLE LISTING INSERT KAREGA
  console.log("Data was initialized");
};

initDB();