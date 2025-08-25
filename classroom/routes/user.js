const express = require("express");
const router = express.Router();

//INDEX -users
router.get("/", (req,res)=>{
    res.send("Get for users");
});
//SHOW - users
router.get("/:id", (req,res)=>{
    res.send("Get for user id");
});
//POST - users
router.post("/", (req,res)=>{
    res.send("POST for users");
});
//DELETE - users
router.post("/:id", (req,res)=>{
    res.send("DELETE for user id");
});

module.exports = router;