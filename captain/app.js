require("dotenv").config()
const express=require("express")
const app=express();
const cookieparser=require("cookie-parser")
const connectDb=require("./db/db")
app.use(express.json())
app.use(cookieparser())
const captainRoutes=require("../captain/routes/captain.routes")
app.use("/captain",captainRoutes)
connectDb()
module.exports=app;