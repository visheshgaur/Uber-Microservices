const mongoose=require("mongoose")

const captainSchema=new mongoose.Schema({
    captainname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAvailable:{
        type:Boolean,
        default:false
    }
})

const captainModel=mongoose.model("captainModel",captainSchema)


module.exports=captainModel;