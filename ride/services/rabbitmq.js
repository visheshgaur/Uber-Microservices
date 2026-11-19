const amqp=require("amqplib")
let connection,channel
const connectrabbit=async()=>{
connection=await amqp.connect(process.env.RABBITMQ_URL)
channel=await connection.createChannel();
console.log("rabbit mq connected")
}

const subscribeToQueue=async(queueName,callback)=>{
    if(!channel) await connectrabbit()
    await channel.assertQueue(queueName)
    channel.consume(queueName,(message)=>{
        callback(message.content.toString());
        channel.ack(message)
    })
}

const publishToQueue=async(queueName,data)=>{
    if(!channel) await connectrabbit()
    await channel.assertQueue(queueName)
    channel.sendToQueue(queueName,Buffer.from(data))
}

module.exports={
    connectrabbit,
    subscribeToQueue,
    publishToQueue
}