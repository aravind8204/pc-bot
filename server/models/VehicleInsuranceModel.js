const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const VehicleSchema = new Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    // required: true 
},
  driverLicense: { 
    type: String, 
    required: true 
},
  driverExp: { 
    type: Number, 
    required: true 
},
  vehicleMake: { 
    type: String, 
    required: true 
},
  vehicleModel: { 
    type: String, 
    required: true 
},
  vehicleYear: { 
    type: Number, 
    required: true 
},
  vehicleRegNumber: { 
    type: String, 
    required: true, 
    unique: true 
},
  chassisNumber: { 
    type: String, 
    required: true, 
    unique: true 
},
  accidentHistory:{
    type:String,
},
  frequencyPayment: { 
    type: String, 
    enum: ["Annual", "Semi-Annual", "Quarterly", "Monthly"], 
    required: true 
},
  deductible: { 
    type: Number, 
    required: true 
},
  policyType: { 
    type: String, 
    enum: ["Third Party", "Comprehensive"], 
    required: true 
},
status: {
  type: String,
}
}, { timestamps: true });

 

module.exports = mongoose.model("VehicleInsurance", VehicleSchema);;
