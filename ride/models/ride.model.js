const mongoose=require("mongoose")
const rideSchema=new mongoose.Schema({
    captain:{
        type:mongoose.Schema.Types.ObjectId
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    pickup:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    status:{
        enum:['Requested','Accepted','Completed','Started'],
        default:'Requested',
        type:String
    }
})

const rideModel=mongoose.model("rideModel",rideSchema)

module.exports=rideModel;            