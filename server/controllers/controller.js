const Life = require("../models/LifeInsuranceModel");
const Vehicle = require("../models/VehicleInsuranceModel");
const User = reuqire("../models/UserModel.js")
const {generatePolicyNo,calculatePremium} = require("../utils/Policy");


const checkPremium = async(req,res) =>{
    try{
        const result = calculatePremium(req.body);
        res.status(200).json(result.finalPremiumPerPayment);
    }
    catch(err){
        res.status(500).send(err.message);
    }
}

const createPolicy = async(req, res) =>{
    try{
        const {userData,policyData}=req.body;
        const policyNo = generatePolicyNo({city:userData.address.city, zipcode:userData.address.zip});

        res.status(200).json({policyNo});
    }
    catch(err){
        res.status(500).send(err.message);
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

module.exports = {createPolicy,testPolicy,checkPremium};

