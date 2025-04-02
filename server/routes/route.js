const express = require('express');
const {createPolicy,testPolicy} = require("../controllers/controller");
const {} = require("../controllers/userController");
const {} = require("../controllers/insuranceController");


const router = express.Router();

router.post("/createpolicy", testPolicy);



//user routes


//insurance routes


module.exports = router;