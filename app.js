const express= require("express");
const app= express();
const mongoose=require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate= require ("ejs-mate");

//MONGO_DB SE CONNECTION KA CHIJ H YHA PE
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});
async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

//HOME ROUTE
app.get("/",(req,res)=>{ 
    res.send("Hi, I am root");
})

//INDEX ROUTE
app.get("/listings", async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
})

//NEW ROUTE
app.get("/listings/new", (req,res)=>{
    res.render("listings/new.ejs")
});

//SHOW ROUTE
app.get("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show", {listing});
})

//CREATE ROUTE
app.post("/listings", async (req,res)=>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})

//EDIT ROUTE
app.get("/listings/:id/edit", async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
}); 

//UPDATE ROUTE
app.put("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect("/listings");
})

//DELETE ROUTE
app.delete("/listings/:id", async (req,res) =>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});

// //TEST_LISTING WALA ROUTE
// app.get("/testListing", async (req,res)=>{
//     let sampleListing = new Listing({
//         title:"My New Villa",
//         description: "By New Beach",
//         price: 1200,
//         location: "Calangute, Goa",
//         Country: "India",
//     });
//     await sampleListing.save();
//     console.log("Sample was saved")
//     res.send("Sucessfull Testing");
// })

//LISTEN KARVANE KA ROUTE
app.listen(8080, ()=>{
    console.log("Servr is listening");
})