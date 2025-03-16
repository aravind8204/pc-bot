const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const policySchema = new Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    policy_number:{
        type:String,
        required:true,
    },
    policy_type:{
        type:String,
        required:true,
    },
    premium_type:{
        type:String,
    },
    start_date:{
        type:Date,
    },
    end_date:{
        type:Date,
    },
    coverage_details:{
        coverage_type:String,
        coverage_amount:Double,
    }
},{timestamps:true,});

const PolicyModel = mongoose.model('Policy',userSchema);

module.exports = PolicyModel;