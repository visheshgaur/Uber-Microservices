const rideModel=require("../models/ride.model")
const {publishToQueue}=require("../services/rabbitmq")
const createride=async(req,res)=>{
    try{
        const {pickup,destination}=req.body;
       
        const newRide=await rideModel.create({
            
            user:req.user,
            pickup:pickup,
            destination:destination
        })
        publishToQueue("new-ride",JSON.stringify(newRide))
        return res.status(201).json({
            message:"Ride created sucess",
           rideDetails:{
            pickup:newRide.pickup,
            destination:newRide.destination
           }
        })
    }
    catch(err){
        return res.status(500).json({
            message:"Server Error"
        })
    }
    return res.status(200).json({
        message:"Runned"
    })
}

module.exports={createride}