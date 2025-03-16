const express = require('express');
const {createPolicy} = require("../controllers/controller");


const router = express.Router();

router.post("/createpolicy", createPolicy);


module.exports = router;