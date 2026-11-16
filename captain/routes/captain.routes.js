const express=require("express")
const router=express.Router()
const captainController=require("../controllers/captain.controller")
const authcaptain=require("../middlewares/captainauth.middleware")
router.post("/register",captainController.registercaptain)
router.post("/login",captainController.logincaptain)
router.post("/logout",captainController.logoutcaptain)
router.get("/profile",authcaptain,captainController.profile)  
module.exports=router;