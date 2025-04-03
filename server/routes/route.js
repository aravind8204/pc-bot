const express = require('express');
const {checkPremium,createPolicy,testPolicy} = require("../controllers/controller");



const router = express.Router();

router.post("/testpolicy", testPolicy);

router.post("/getpremium", checkPremium);

router.post("/createpolicy", createPolicy);


module.exports = router;