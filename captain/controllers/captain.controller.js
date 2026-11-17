const captainModel=require("../models/captain.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


const registercaptain=async(req,res)=>{
    try{
        const {captainname,email,password}=req.body;
        if(!captainname||!email||!password){
            return res.status(400).json({
                message:"Fill out all fields and try again !!"
            })
        }
        const captainexist=await captainModel.findOne({email});
        if(captainexist){
            return res.status(409).json({
                message:"captain already exists"
            })
        }
        const hashedpassword=await bcrypt.hash(password,10)
        const newcaptain=await captainModel.create({
            captainname,email,password:hashedpassword
        });
        const token= jwt.sign({id:newcaptain._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        res.cookie("token",token)
        return res.status(201).json({
            message:"captain registered sucessfully !!",
            captainid:newcaptain._id,
            captainname:newcaptain.captainname,
            email:newcaptain.email
        })
    }
    catch(err){
        return res.status(500).json({
            message:"An error occured !!"
        })
    }
}
const logincaptain=async(req,res)=>{
    try {
        const {captainname,email,password}=req.body;
        if(!captainname&&!email){
            return res.status(400).json({
                message:"Please enter captainname or email"
            })
        }
        if(!password){
            return res.status(400).json({
                message:"Password is required!!"
            })
        }
        const captainexist=await captainModel.findOne({$or:[{captainname},{email}]})
        if(!captainexist){
            return res.status(404).json({
                message:"No captain exist!!"
            })
        }
        const matched=await bcrypt.compare(password,captainexist.password)
        if(!matched){
            return res.status(401).json({
                message:"Invalid credentials"
            })
        }
        const token= jwt.sign({id:captainexist._id},process.env.JWT_SECRET,{expiresIn:'1h'})
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
const logoutcaptain=async(req,res)=>{
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


const profile=async(req,res)=>{
    try {
        const id=req.captain.id;
        const captain=await captainModel.findById(id)
        return res.status(200).json({
            message:"Profile fetched",
            profiledata:{
                id:id,
                name:captain.captainname,
                isavailable:captain.isAvailable

            }
        })
    } catch (error) {
        return res.status(500).json({
            message:"Server error"
        })
    }
}

const toggleavailability=async(req,res)=>{
try{
    const id=req.captain.id
    
    if(!id){
        return res.status(400).json({
            message:"Captain id is required"
        })
    }
    const captain=await captainModel.findById(id)
    if(!captain){
        return res.status(404).json({
            message:"Captain doesnt exist"
        })
    }
    captain.isAvailable=!captain.isAvailable;
    captain.save();
    return res.status(200).json({
        message:"Captain is toogled"
    })
}
catch(err){
    console.log(err)
}
}
module.exports={registercaptain,logincaptain,logoutcaptain,profile,toggleavailability}