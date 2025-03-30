const User=require('../models/UserModel.js');
const Policy=require('../models/PolicyModel.js');



const createPolicy = async(req,res)=>{
    // const {name,email,age,mobile,dob,
    //     address,policy_type,premium_type,
    //     start_date,end_date,coverage_details} = req.body;
    try{
    //     const data = ["hello","abc@gmail.com",30,9876504321,Date.now()];
    // const addr={street:"ab street",
    //         city:"Austin",
    //         state:"Texas",
    //         zipcode:73301}

    // const d = await User.create({name:data[0],email:data[1],age:data[2],mobile:data[3],dob:data[4],address:addr});
        const cv = {
        coverage_type:"basic",
        coverage_amount:1000000}

    const d= await Policy.create({userid:"67d6bbe565decb6c918549b8",policy_number:"VA30100001",policy_type:"life",premium_type:"hlf",start_date:new Date(),end_date:new Date,coverage_details:cv})
    res.status(201).json(d);
    console.log("h")
    }catch(e){
        res.send(e);
    }
}

const testPolicy =async(req,res)=>{
    try{
        const d = req.body;
        res.send(d);
    }
    catch(e){
        res.send(e);
    }
}

module.exports = {createPolicy,testPolicy};

