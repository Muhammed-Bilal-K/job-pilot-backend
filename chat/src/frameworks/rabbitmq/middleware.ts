import UserRepository from "../../repositories/user.respsitory";
import QueueConsumer from "./consumer";
import { Exchanges } from "./exchanges";
import { Topics } from "./topics";

const queueConsumer = new QueueConsumer();
const userRepository = new UserRepository();

const processData = async (data: any) => {
  console.log("Received data:", data);
  switch (data.topic) {
    case Topics.USER_CREATE:
      const user = await userRepository.create(data);
      break;
    default:
      break;
  }
};

export const startListening = async () => {
  try {
    await queueConsumer.listen(
      Exchanges.USER_EXCHANGE,
      Topics.USER_CREATE,
      processData
    );
    console.log("Listening to the queue for incoming messages...");
  } catch (error) {
    console.error("Error starting the listener:", error);
  }
};
