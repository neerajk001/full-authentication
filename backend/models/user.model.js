import mongoose from "mongoose";
import { Schema } from "mongoose";


const userSchema =new Schema({

    email:{
        type:String,
        unique:true,
        required:true
    },

    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    lastLogin:{
        type:Date,
        default:Date.now
    },

    isVerified:{
        type:Boolean,
        default:false
    },

    resetPasswordToken:String,
    resetPasswordExpiredAt:Date,
    verificationToken:String,
    verificationTokenExpireAt:Date

},

{timestamps:true}

)


export const User = mongoose.model ("User", userSchema)