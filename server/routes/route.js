const express = require('express');
const {createPolicy,testPolicy} = require("../controllers/controller");


const router = express.Router();

router.post("/createpolicy", testPolicy);


module.exports = router;