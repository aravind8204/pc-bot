//importing required modules
const express = require("express");
const { connectDb } = require("./database/db.js");
const route = require('./routes/route');
const cors = require("cors");


const app = express();
connectDb();

//middleware
app.use(express.json());
app.use(cors());


//initial testing
app.use("/test", (req,res)=>{
    res.send("working")
});

//api routing
app.use("/",route);

app.listen(5500,()=>{
    console.log("listening at 5500");
})