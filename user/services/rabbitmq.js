const amqp=require("amqplib")
let connection,channel;
const connectRabbit=async()=>{
    connection=await amqp.connect(process.env.RABBITMQ_URL)
    channel=await connection.createChannel()
    console.log("rabbit mq connected")
}

const subscribeToQueue=async(queueName,callback)=>{
    if(!channel) await connectRabbit()
    await channel.assertQueue(queueName)
    await channel.consume(queueName,(message)=>{
        callback(message.content.toString())
        channel.ack(message)
    })
}

const publishToQueue=async(queueName,data)=>{
    if(!channel) await connectRabbit();
    await channel.assertQueue(queueName)
    channel.sendToQueue(queueName,buffer.from(data))
}



module.exports={
    connectRabbit,
    subscribeToQueue,
    publishToQueue
}