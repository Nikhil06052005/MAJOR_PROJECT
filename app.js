//BASIC IMPORTS
if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

//ROUTERS
const listingRouter = require("./routes/listing.js"); //LISTING RELATED ROUTES
const reviewRouter = require("./routes/review.js"); //REVIEWS RELATED ROUTES
const userRouter = require("./routes/user.js"); //LOGIN/REGISTER/LOGOUT ROUTES

//MONGO_DB SE CONNECTION KA CHIJ H YHA PE
const dbUrl = process.env.ATLASDB_URL;

//AGAR CONNECT HUA TOH "CONNECTED TO DB PRINT HOGA" VARNA "ERROR" PRINT HOGA
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(dbUrl);
}

//APP CONFIG
app.set("view engine", "ejs");  //TEMPLATING ENGINE SET
app.set("views", path.join(__dirname, "views"));  //VIEW FOLDER PAT SET
app.use(express.urlencoded({ extended: true }));  //FORM DATA READ KRNE KE LIYE
app.use(methodOverride("_method")); //PUT/DELETE REQUESTS ALLOW
app.engine("ejs", ejsMate); //LAYOUTS/PARTIALS ALLOW
app.use(express.static(path.join(__dirname, "/public"))); //STATIC FILES SERVE 


const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: "process.env.SECRET",
  }, 
  touchAfter: 24 * 60 * 60 //time period in seconds
});

store.on("error", ()=>{
  console.log("ERROR IN MONGO SESSION STORE", err);
});

//SESSION OPTIONS: 
// session create hoga => client browser me ek cookie milegi 
// secret code => session encrypt hoga
// cookie 7 din me expire hoga

const sessionOptions = {
  store,
  secret: "process.env.SECRET",
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  }
};

//HOME ROUTE
app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.use(session(sessionOptions));
app.use(flash("")); //SUCCESS/ERROR MSG STORE KRNE KE LIYE

//PASSPORT CONFIG
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

 //SERIALIZE/DE-SERIALIZE: user ko session me store aur wapas fetch krna
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//LOCAL VARIABLE MIDDLEWARE: har ejs file ke liye success/error msg available hote h
app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// app.get("/demouser", async(req,res)=>{
//   let fakeUser = new User({
//     email: "student@gmail.com",
//     username: "delta-student"
//   });

//   let registeredUser = await User.register(fakeUser, "helloworld");
//   res.send(registeredUser);
// });

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// app.all("*", (req,res,next)=>{
//     next(new ExpressError(404, "Page Not Found"));
// });

//ERROR HANDLER: agar error aaya toh ek page render karega
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.render("error.ejs", { message });
});

//SERVER LISTEN: server localhost:8080 pe run karega
app.listen(8080, () => {
  console.log("Server is listening to port 8080");
});
