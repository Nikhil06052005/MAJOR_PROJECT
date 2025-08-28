const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

//LISTING SCHEMA(Mongoose)
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://amazingarchitecture.com/storage/files/1/architecture-firms/amin-moazzen/black-fly/black_house_amin_moazzen_bangal_india-3.jpg",
    set: (v) =>
      v === ""
        ? "https://amazingarchitecture.com/storage/files/1/architecture-firms/amin-moazzen/black-fly/black_house_amin_moazzen_bangal_india-3.jpg"
        : v,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

//MIDDLEWARE (post hook):jb koi listing delete hoti h => uske sare associated reviews bhi delete ho jaate h automatically.
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.review } });
  }
});

//MODEL
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
