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
        const {userData}=req.body;
        const policyNo = generatePolicyNo({city:userData.address.city, zipcode:userData.address.zip});

        const userresult = await User.create({name:userData.name,
                                            age:userData.age,
                                            dob:userData.dob,
                                            gender:userData.gender,
                                            address:userData.address,
                                            mobile:userData.mobile,
                                            email:userData.email,
                                            policies:[{
                                                policyNumber: policyNo,
                                                insuranceType: userData.InsuranceType
                                            }]});

        if (userData.InsuranceType=="Life Insurance"){
            const {lifeData} = req.body;
            const result = await Life.create({
                userid:userresult._id,
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
                userid:userresult._id,
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

