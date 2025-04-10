const mongoose = require('mongoose')

const connectDb = async ()=>{
    try{
        // await mongoose.connect("mongodb://127.0.0.1:27017/pc-bot")
        await mongoose.connect("mongodb+srv://aravind:admin8204@cluster0.nl387uc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Db connection established");
    }
    catch(e){
        console.log(e.message);
    }
}

module.exports = {connectDb};