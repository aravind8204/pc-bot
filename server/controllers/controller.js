// Importing required models and utility functions
const Life = require("../models/LifeInsuranceModel");
const Vehicle = require("../models/VehicleInsuranceModel");
const User = require("../models/UserModel.js")
const {generatePolicyNo,calculatePremium} = require("../utils/Policy");

// Function to check the premium based on request data
const checkPremium = async(req,res) =>{
    try{
        // Calculate the premium using request data
        const result = calculatePremium(req.body);

        // Return the calculated premium
        res.status(200).json(result.finalPremiumPerPayment);
    }
    catch(err){
        // Handle errors and send the error message
        res.status(500).send(err.message);
    }
}

// Function to create a new insurance policy for a user
const createPolicy = async(req, res) =>{
    try{
        const {userData}=req.body; // Destructure user data from the request body

        // Generate a unique policy number based on the user's city and zipcode
        const policyNo = await generatePolicyNo({city:userData.address.city, zipcode:userData.address.zip});

        // Create a new user record with the policy details
        const userresult = await User.create({name:userData.name,
                                            age:userData.age,
                                            dob:userData.dob,
                                            gender:userData.gender,
                                            address:userData.address,
                                            mobile:userData.mobile,
                                            email:userData.email,
                                            bankDetails:{
                                                bankName:userData.bankName,
                                                accountNumber:userData.accountNo,
                                                routingNumber:userData.routingNumber
                                            },
                                            policies:[{
                                                policyNumber: policyNo,
                                                insuranceType: userData.InsuranceType
                                            }]});

        // Depending on the insurance type, create the relevant policy (Life or Vehicle)
        if (userData.InsuranceType=="Life Insurance"){
            const {lifeData} = req.body;
            const result = await Life.create({
                userId:userresult._id,  // Link the policy to the user
                preConditionStatus:lifeData.preConditionStatus,
                preConditionStatusDesc:lifeData.preConditionStatusDesc,
                smoke:lifeData.smoke,
                alcohol:lifeData.alcohol,
                policyType:lifeData.policyType,
                policyTerm:parseInt(lifeData.policyTerm) || 0,
                coverageAmount:lifeData.coverageAmount,
                frequencyPayment:lifeData.frequencyPayment,
                beneficiaryName:lifeData.beneficiaryName,
                beneficiaryRelation:lifeData.beneficiaryRelation
            });
        }
        else if(userData.InsuranceType=="Vehicle Insurance"){
            const {vehicleData} = req.body;
            const result = await Vehicle.create({
                userId:userresult._id,  // Link the policy to the user
                driverLicense:vehicleData.driverLicense,
                driverExp:vehicleData.driverExp,
                vehicleMake:vehicleData.vehicleMake,
                vehicleModel:vehicleData.vehicleModel,
                vehicleYear:vehicleData.vehicleYear,
                vehicleRegNumber:vehicleData.vehicleRegNumber,
                chassisNumber:vehicleData.chassisNumber,
                accidentHistory:vehicleData.accidentHistory,
                frequencyPayment:vehicleData.frequencyPayment,
                deductible:vehicleData.deductible,
                policyType:vehicleData.policyType
            });
        }
         // Send a response with the generated policy number
        res.status(200).json({policyNo});
    }
    catch(err){
        res.status(500).send(err);
    }
}

const getPolicyNo = async(req,res)=>{
    try {
        const policy =await generatePolicyNo(req.body);
        res.status(200).json(policy)
    } catch (error) {
        res.send(500).json({error});
    }
}

// Test function to receive and send back the data (useful for debugging)
const testPolicy = async (req, res) => {
    try {
      // Send back the data received in the request body
      const d = req.body;
      res.send(d);
    } catch (e) {
      // If an error occurs, send the error message
      res.send(e);
    }
  }

  // Export the functions to be used in the routes
module.exports = {createPolicy,testPolicy,checkPremium,getPolicyNo};

