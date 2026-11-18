const express=require("express")
const router=express.Router()
const authUser=require("../middleware/ride.auth")
const rideController=require("../controllers/ride.controller")
router.post("/create-ride",authUser,rideController.createride)
module.exports=router