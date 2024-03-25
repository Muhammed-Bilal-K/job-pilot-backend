import CompanyRepository from "../../repositories/company.repositories";
import QueueConsumer from "./consumer";
import { Exchanges } from "./exchanges";
import { Topics } from "./topics";

const queueConsumer = new QueueConsumer();
const companyRepository = new CompanyRepository();

const processData = async (data: any) => {
  console.log("Received data:", data);
  switch (data.topic) {
    case Topics.JOB_CREATE:
      const company = await companyRepository.createUser(data);
      break;
    default:
      break;
  }
};

export const startListening = async () => {
  try {
    await queueConsumer.listen(
      Exchanges.EMPLOYER_EXCHANGE,
      Topics.JOB_CREATE,
      processData
    );
    console.log("Listening to the queue for incoming messages...");
  } catch (error) {
    console.error("Error starting the listener:", error);
  }
};
