const express=require("express")
const router=express.Router()
const authUser=require("../middleware/ride.auth")
router.get("/profile",authUser,(req,res)=>{
    return res.status(200).json({
        message:"working"
    })
})
module.exports=router