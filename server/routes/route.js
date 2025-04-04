// Importing required modules
const express = require('express');
const {checkPremium,createPolicy,testPolicy} = require("../controllers/controller");
const {generatePolicyNo} = require("../utils/Policy")



const router = express.Router();

router.post("/testpolicy", testPolicy);

// Route to calculate and return the premium
router.post("/getpremium", checkPremium);

// Route to create a new policy for the user
router.post("/createpolicy", createPolicy);

// Route to generate a policy number (this will return a unique policy number)
router.post("/getpolicyno",generatePolicyNo);


module.exports = router;