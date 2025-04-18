const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lifeSchema = new Schema(
    {
      policyNumber:{
        type: String,
        required: true
      },
        userId: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "User", 
          required: true 
        },
        preConditionStatus: {
          type: String,
          required: true,
          enum: ['Yes', 'No'],
        },
        preConditionStatusDesc: {
          type: String,
          default: '',
        },
        smoke: {
          type: String,
          required: true,
          enum: ['Yes', 'No'],
        },
        alcohol: {
          type: String,
          required: true,
          enum: ['Yes', 'No'],
        },
        policyType: {
          type: String,
          required: true,
          enum: ["Whole Life Insurance","Term Life Insurance"]
        },
        policyTerm: {
          type: Number,
          default: null,
        },
        coverageAmount: {
          type: Number,
          required: true,
        },
        frequencyPayment: {
          type: String,
          required: true,
          enum: ['Annual', 'Semi-Annual', 'Quarterly', 'Monthly'],
        },
        beneficiaryName: {
          type: String,
          required: true,
        },
        beneficiaryRelation: {
          type: String,
          required: true,
        },
        status: {
          type: String,
        },
        expiryDate: {
          type: Date,
        },
        premium:{
          type:String
        }
      }, { timestamps: true }
)

module.exports = mongoose.model('lifeInsurance',lifeSchema);;