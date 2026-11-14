const express=require("express")
const router=express.Router()
const userController=require("../controllers/user.controller")
const authuser=require("../middlewares/auth.middleware")
router.post("/register",userController.registeruser)
router.post("/login",userController.loginuser)
router.post("/logout",userController.logoutuser)
router.get("/profile",authuser,(req,res)=>{
    res.status(200).json({
        message:"Middleware working"
    })
})  
module.exports=router;