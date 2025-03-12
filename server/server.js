//importing required modules
const express = require("express");
const { connectDb } = require("./database/db.js");


const app = express();
connectDb();

//middleware
app.use(express.json());

//initial testing
app.use("/test", (req,res)=>{
    res.send("working")
});


app.listen(5500,()=>{
    console.log("listening");
})