require("dotenv").config()
const express=require("express")
const app=express();
const cookieparser=require("cookie-parser")
const connectDb=require("./db/db")
app.use(express.json())
app.use(cookieparser())
const userRoutes=require("../user/routes/user.routes")
app.use("/",userRoutes)
connectDb()
module.exports=app;