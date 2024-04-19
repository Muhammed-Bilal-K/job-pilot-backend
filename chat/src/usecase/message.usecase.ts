import QueuePublisher from "../frameworks/rabbitmq/publisher";
import Message from "../interfaces/message.interface";
import IMessageRepository from "../interfaces/repository/message.respository";
import IMessageUsecase from "../interfaces/usecase/message.usecase";
// import { IAuth } from "../entities/conversation";

class MessageUsecase implements IMessageUsecase {
  private messageRepository: IMessageRepository;
  private queuePublisher: QueuePublisher;
  constructor(
    messageRepository: IMessageRepository,
    queuePublisher: QueuePublisher
  ) {
    this.messageRepository = messageRepository;
    this.queuePublisher = queuePublisher;
  }

  public async create(message: Message) {
    try {
      const newMessage = await this.messageRepository.create(message);
      return newMessage;
    } catch (error) {
      throw error;
    }
  }

  public async getConvo(id : string) {
    try {
        const convo=await this.messageRepository.getConversation(id);
      return convo;
    } catch (error) {
      throw error;
    }
  }
}

export default MessageUsecase;
