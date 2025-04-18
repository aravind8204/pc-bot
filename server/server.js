//importing required modules
const express = require("express");
const { connectDb } = require("./database/db.js");
const route = require('./routes/route');
const cors = require("cors");
const path = require("path")


const app = express();
connectDb();

//middleware
app.use(express.json());
app.use(cors());

app.use('/pdfs', express.static(path.join(__dirname, 'utils','documents')));

//initial testing
app.use("/test", (req,res)=>{
    res.send("working")
});

//api routing
app.use("/",route);

app.listen(5500,()=>{
    console.log("listening at 5500");
})