import amqp, { Channel, Connection } from "amqplib";
require("dotenv").config();

const connect = async function (): Promise<{ connection: Connection | undefined, channel: Channel | undefined }> {
  try {
    let channel: Channel | undefined;
    let connection: Connection | undefined;
    // const amqpServer = process.env.RABBIT_MQ!
    connection = await amqp.connect("amqp://rabbitmq:5672");
    channel = await connection.createChannel();
    console.log("Channel created");
    return { connection, channel };
  } catch (err) {
    console.error("Error connecting to RabbitMQ:", err);
    throw err;
  }
};

export default connect;