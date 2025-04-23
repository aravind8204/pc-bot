const { mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
    first: { type: String, required: true },
    last: { type: String, default: null }
  },
  age: {
    type: Number,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  address: {
    zip: { type: String, required: true },
    city: { type: String, default: null },
    number: { type: String, default: null },
    street: { type: String, default: null },
    country: { type: String }
  },
  mobile: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  policies: [
    {
      policyNumber: { type: String},
      insuranceType: { type: String},
    }
  ],
  bankDetails: {
    bankName: { type: String, required: true },
    accountNumber: { type: Number, required: true },
    routingNumber: { type: Number, required: true }
  },
  status:{
    type: String,
  }
},
    {
        timestamps:true,
    }
)


module.exports = mongoose.model('User',userSchema);