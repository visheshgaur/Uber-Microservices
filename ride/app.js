require("dotenv").config()
const express=require("express")
const app=express()
const rideroutes=require("./routes/ride.routes")
const connectDb=require("./db/db")
const cookieparser=require("cookie-parser")
const connectRabbit=require("./services/rabbitmq")
connectRabbit.connectrabbit()
app.use(express.json())
app.use(cookieparser())
connectDb()
app.use("/",rideroutes)


module.exports=app;