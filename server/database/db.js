import mongoose from "mongoose";

export const connectDb = async ()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/pc-bot");
        console.log("Db connection established");
    }
    catch(e){
        console.log(e.message);
    }
}