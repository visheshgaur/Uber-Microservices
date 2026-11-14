const express=require("express")
const router=express.Router()
const userController=require("../controllers/user.controller")
router.post("/register",userController.registeruser)
router.post("/login",userController.loginuser)
router.post("/logout",userController.logoutuser)
module.exports=router;