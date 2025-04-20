// Importing required modules
const express = require('express');
const {checkPremium,createPolicy} = require("../controllers/controller");



const router = express.Router();



// Route to calculate and return the premium
router.post("/getpremium", checkPremium);

// Route to create a new policy for the user
router.post("/createpolicy", createPolicy);


module.exports = router;