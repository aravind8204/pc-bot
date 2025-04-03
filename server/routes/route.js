const express = require('express');
const {checkPremium,createPolicy,testPolicy} = require("../controllers/controller");
const {generatePolicyNo} = require("../utils/Policy")



const router = express.Router();

router.post("/testpolicy", testPolicy);

router.post("/getpremium", checkPremium);

router.post("/createpolicy", createPolicy);

router.post("/getpolicyno",generatePolicyNo);


module.exports = router;