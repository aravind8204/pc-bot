const Life = require("../models/LifeInsuranceModel");
const Vehicle = require("../models/VehicleInsuranceModel");
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

const generatePolicy = async(req, res) =>{
    try{
        const {userData,policyData}=req.body;
        const result = generatePolicyNo({city:userData.address.city, zipcode:userData.address.zip});

    }
    catch(err){
        res.status(500).send(err.message);
    }
}