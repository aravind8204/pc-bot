const Policy = require("../models/PolicyModel");


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

 const generatePolicyNo = async(data) =>{
        const {state,zipcode} = data;
        const usps = statesUSPS.find(states => states.state.includes(state));

        const first_half = usps.code+zipcode.toString().slice(-3)

        const latestRecord = await Policy.findOne().sort({ _id: -1 });

        console.log(latestRecord)

        console.log();
  }

generatePolicyNo({state:"Virginia",zipcode:60215})