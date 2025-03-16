//importing required modules
const express = require("express");
const { connectDb } = require("./database/db.js");
const route = require('./routes/route');


const app = express();
connectDb();

//middleware
app.use(express.json());

//initial testing
app.use("/test", (req,res)=>{
    res.send("working")
});

//api routing
app.use("/",route);

app.listen(5500,()=>{
    console.log("listening at 5500");
})