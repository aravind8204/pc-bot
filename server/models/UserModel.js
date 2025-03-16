const { mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type:String,
            required: true
        },
        email:{
            type:String,
            required: true
        },
        age:{
            type:Number,
            required:true
        },
        mobile:{
            type:Number,
            required: true
        },
        dob:{
            type:String,
            required: true
        },
        address:{
            street:{
                type:String,
            },
            city:{
                type:String,
            },
            state:{
                type:String,
            },
            pincode:{
                type:Number,
                required: true
            }
        }
    },
    {
        timestamps:true,
    }
)

const UserModel = mongoose.model('User',userSchema);

module.exports = UserModel;