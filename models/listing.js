const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
     image: {
    filename: { type: String, default: "defaultfilename" },
    url: {
      type: String,
      default: "https://unsplash.com/photos/roadside-view-of-mountains-and-sunset-colors-VvIug1kr8yU",
      set: (v) => v === "" ? "https://unsplash.com/photos/roadside-view-of-mountains-and-sunset-colors-VvIug1kr8yU" : v
    }
  },
    price: Number,
    location: String,
    country: String,
})

const Listing = mongoose.model("Listing", listingSchema );
module.exports = Listing;