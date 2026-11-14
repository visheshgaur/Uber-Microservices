const userModel=require("../models/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


const registeruser=async(req,res)=>{
    try{
        const {username,email,password}=req.body;
        if(!username||!email||!password){
            return res.status(400).json({
                message:"Fill out all fields and try again !!"
            })
        }
        const userexist=await userModel.findOne({email});
        if(userexist){
            return res.status(409).json({
                message:"user already exists"
            })
        }
        const hashedpassword=await bcrypt.hash(password,10)
        const newuser=await userModel.create({
            username,email,password:hashedpassword
        });
        const token= jwt.sign({id:newuser._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        res.cookie("token",token)
        return res.status(201).json({
            message:"user registered sucessfully !!",
            userid:newuser._id,
            username:newuser.username,
            email:newuser.email
        })
    }
    catch(err){
        return res.status(500).json({
            message:"An error occured !!"
        })
    }
}
const loginuser=async(req,res)=>{
    try {
        const {username,email,password}=req.body;
        if(!username&&!email){
            return res.status(400).json({
                message:"Please enter username or email"
            })
        }
        if(!password){
            return res.status(400).json({
                message:"Password is required!!"
            })
        }
        const userexist=await userModel.findOne({$or:[{username},{email}]})
        if(!userexist){
            return res.status(404).json({
                message:"No user exist!!"
            })
        }
        const matched=await bcrypt.compare(password,userexist.password)
        if(!matched){
            return res.status(401).json({
                message:"Invalid credentials"
            })
        }
        const token= jwt.sign({id:userexist._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        res.cookie("token",token)
        return res.status(200).json({
            message:"Login success"
        })
    } catch (error) {
        return res.status(500).json({
            message:"Server error occured!!!"
        })
    }
}
const logoutuser=async(req,res)=>{
   try {
     res.clearCookie("token");
     return res.status(200).json({
        message:"Logout successfully!!"
     })
   } catch (error) {
    return res.status(500).json({
        message:"Server error"
    })
   }
}

module.exports={registeruser,loginuser,logoutuser}