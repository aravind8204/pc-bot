// Importing necessary models
const user = require("../models/UserModel");
const vehicleModel = require("../models/VehicleInsuranceModel");
const lifeModel = require("../models/LifeInsuranceModel");

// List of US states and their corresponding USPS codes
const statesUSPS = [
    { state: "Alabama", code: "AL" },
    { state: "Alaska", code: "AK" },
    { state: "Arizona", code: "AZ" },
    { state: "Arkansas", code: "AR" },
    { state: "California", code: "CA" },
    { state: "Colorado", code: "CO" },
    { state: "Connecticut", code: "CT" },
    { state: "Delaware", code: "DE" },
    { state: "Florida", code: "FL" },
    { state: "Georgia", code: "GA" },
    { state: "Hawaii", code: "HI" },
    { state: "Idaho", code: "ID" },
    { state: "Illinois", code: "IL" },
    { state: "Indiana", code: "IN" },
    { state: "Iowa", code: "IA" },
    { state: "Kansas", code: "KS" },
    { state: "Kentucky", code: "KY" },
    { state: "Louisiana", code: "LA" },
    { state: "Maine", code: "ME" },
    { state: "Maryland", code: "MD" },
    { state: "Massachusetts", code: "MA" },
    { state: "Michigan", code: "MI" },
    { state: "Minnesota", code: "MN" },
    { state: "Mississippi", code: "MS" },
    { state: "Missouri", code: "MO" },
    { state: "Montana", code: "MT" },
    { state: "Nebraska", code: "NE" },
    { state: "Nevada", code: "NV" },
    { state: "New Hampshire", code: "NH" },
    { state: "New Jersey", code: "NJ" },
    { state: "New Mexico", code: "NM" },
    { state: "New York", code: "NY" },
    { state: "North Carolina", code: "NC" },
    { state: "North Dakota", code: "ND" },
    { state: "Ohio", code: "OH" },
    { state: "Oklahoma", code: "OK" },
    { state: "Oregon", code: "OR" },
    { state: "Pennsylvania", code: "PA" },
    { state: "Rhode Island", code: "RI" },
    { state: "South Carolina", code: "SC" },
    { state: "South Dakota", code: "SD" },
    { state: "Tennessee", code: "TN" },
    { state: "Texas", code: "TX" },
    { state: "Utah", code: "UT" },
    { state: "Vermont", code: "VT" },
    { state: "Virginia", code: "VA" },
    { state: "Washington", code: "WA" },
    { state: "West Virginia", code: "WV" },
    { state: "Wisconsin", code: "WI" },
    { state: "Wyoming", code: "WY" }
  ];

// Function to generate a unique policy number based on city and zipcode
 const generatePolicyNo = async(req,res,data) =>{
        const {city,zipcode} = req.body;
        let r;
        const states = statesUSPS.find(states => states.state.includes(city));
        if (!states) {console.log("h"); }
        else{
            // Construct the first part of the policy number (state code + last 3 digits of zipcode)
            const first_half = states.code+zipcode.toString().slice(-3)

            // Get the current count of documents in both vehicleModel and lifeModel collections
            const second_half = await vehicleModel.countDocuments()+await lifeModel.countDocuments();

            r = first_half+second_half.toString().padStart(5, '0');
            console.log(r);
        }
        res.send({policyNo:r});

// new logic for the function     IMP NOTE :: Need to implement this logic
        // try {
            // Ensure that you find a state that matches the city
            // const state = statesUSPS.find(states => states.state.includes(city));
        
            // if (!state) {
            //   throw new Error(`No state found for city: ${city}`);
            // }


        
        

        

        
  }


  // Function to calculate the insurance premium based on provided data
const calculatePremium = (data) =>{
  let annualPremium = 0;

    const { insuranceType, frequencyPayment } = data;

    if (insuranceType === "Life Insurance") {
        // Extract life insurance related data
        const { age, coverageAmount, policyType, smoke, alcohol, preConditionStatus, policyTerm } = data;

        // Base rates for life insurance policies
        const baseRates = {
            "Whole Life Insurance": 1.5,
            "Term Insurance": 1.2
        };

        // Get the base rate for the policy type (default to 1.5 if not found)
        const baseRate = baseRates[policyType] || 1.5;
        const basePremium = (coverageAmount / 100) * baseRate;
        
        // Risk factors based on age, habits, and preconditions
        const ageFactor = age / 100;
        const habitsFactor = (smoke === "Yes" ? 0.2 : 0) + (alcohol === "Yes" ? 0.1 : 0) + (preConditionStatus === "Yes" ? 0.3 : 0);
        const riskFactor = 1 + ageFactor + habitsFactor; 

        // Adjust for policy term
        const policyTermFactor = policyTerm ? policyTerm / 10 : 1;
        
        // Calculate the annual premium
        annualPremium = basePremium * riskFactor * policyTermFactor;
    } 
    
    else if (insuranceType === "Vehicle Insurance") {
        // Extract vehicle insurance related data
        const { vehicleMake, vehicleModel, vehicleYear, coverageType, driverExperience, accidentHistory } = data;

        // Vehicle insurance rates based on coverage type
        const vehicleRates = {
            "Third Party": 2000,
            "Comprehensive": 5000
        };

        // Factors based on vehicle make and model
        const vehicleMakeModelFactors = {
            "Toyota Corolla": 1.05,
            "Honda Civic": 1.05,
            "Ford Fiesta": 1.03,
            "Hyundai Elantra": 1.04,
            "Chevrolet Spark": 1.02,
            "Nissan Versa": 1.02,
            "Kia Rio": 1.03,
            "Mazda 3": 1.04,
            "Toyota Camry": 1.1,
            "Honda Accord": 1.1,
            "Ford Fusion": 1.1,
            "Chevrolet Malibu": 1.08,
            "BMW 3 Series": 1.3, // Luxury cars
            "Mercedes-Benz C-Class": 1.35,
            "Audi A4": 1.3,
            "Tesla Model 3": 1.25,
            "Lexus ES": 1.2,
            "Jaguar XE": 1.4,  // Premium brands
            "Porsche 911": 1.5,  // High-end sports cars
            "Lamborghini Huracán": 1.8,  // Exotic cars
            "Ferrari 488": 1.9  // Exotic cars
        };

        // Get the vehicle rate based on coverage type
        const vehicleRate = vehicleRates[coverageType] || 2000;
        const coverageFactor = coverageType === "Comprehensive" ? 1.5 : 1.2;
        const ageFactor = (2025 - vehicleYear) / 10;
        const driverRiskFactor = (driverExperience < 5 ? 0.2 : 0) + (accidentHistory === "Yes" ? 0.3 : 0);

        // Adjust the rate based on make and model
        const vehicleMakeModel = `${vehicleMake} ${vehicleModel}`;
        const makeModelFactor = vehicleMakeModelFactors[vehicleMakeModel] || 1.0;

        // Calculate the annual premium for vehicle insurance
        annualPremium = vehicleRate * ageFactor * coverageFactor * (1 + driverRiskFactor) * makeModelFactor;
    }

    // Frequency Adjustment Factors
    const frequencyFactors = {
        "Annual": 1.0,
        "Semi-Annual": 1.05,
        "Quarterly": 1.10,
        "Monthly": 1.15
    };

    const divisionFactors = {
        "Annual": 1,
        "Semi-Annual": 2,
        "Quarterly": 4,
        "Monthly": 12
    };

    // Adjust and divide based on frequency
    const adjustedPremium = (annualPremium * frequencyFactors[frequencyPayment]) / divisionFactors[frequencyPayment];

    return {
        annualPremium: annualPremium.toFixed(2),
        finalPremiumPerPayment: adjustedPremium.toFixed(2),
        frequencyType: frequencyPayment
    };
} 


// const checkCount = async() =>{
//     const count = await user.countDocuments({});
//     console.log(count);
// }


const lifeData = {
  insuranceType: "Life Insurance",
  age: 23,
  coverageAmount: 400000,
  policyType: "Whole Life Insurance",
  smoke: "No",
  alcohol: "No",
  preConditionStatus: "No",
  policyTerm: null,
  frequencyPayment: "Quarterly"
};

// console.log("Life Insurance Premium:", calculatePremium(lifeData));

// checkCount();

// Export the functions to be used
module.exports = { generatePolicyNo, calculatePremium };