const userModel=require("../models/user.model")
const bcrypt=require("bcrypt")
const jsonwebtoken=require("jsonwebtoken")


const registeruser=(async(req,res)=>{
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
        const token=jwt.sign({id:newuser._id},process.env.JWT_SECRET,{expiresIn:'1hr'})
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
})



module.exports={registeruser}