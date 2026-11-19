require("dotenv").config()
const express=require("express")
const app=express();
const cookieparser=require("cookie-parser")
const connectDb=require("./db/db")
const rabbitmq=require("./services/rabbitmq")
app.use(express.json())
app.use(cookieparser())
rabbitmq.connectRabbit()
const captainRoutes=require("../captain/routes/captain.routes")
app.use("/",captainRoutes)
connectDb()
module.exports=app;