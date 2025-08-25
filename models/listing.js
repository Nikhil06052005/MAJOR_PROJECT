const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js"); 

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
    default: "https://media.istockphoto.com/id/636484522/photo/hotel-resort-swimming-pool.jpg?s=1024x1024&w=is&k=20&c=zKSS6l9tyGFnoNwp2nfJlzwvuGcQRCuH6YWbObRBgPE=",
    set: v => v ? v : "https://unsplash.com/photos/roadside-view-of-mountains-and-sunset-colors-VvIug1kr8yU"
}

  },
    price: Number,
    location: String,
    country: String,
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      }
    ]
})

listingSchema.post("findOneAndDelete", async(listing)=>{
  if(listing){
    await Review.deleteMany({_id: {$in: listing.review}});
  };
});

const Listing = mongoose.model("Listing", listingSchema );
module.exports = Listing;