import {
  IActivationRequest,
  ILoginRequest,
  IRegisterRequest,
  IRequestEmail,
  IResendOtp,
  InputPass,
} from "../interfaces/conversation.interface";
import QueuePublisher from "../frameworks/rabbitmq/publisher";
import IConversationRepository from "../interfaces/repository/conversation.repository";
import IConversationUsecase from "../interfaces/usecase/conversation.usecase";
// import { IAuth } from "../entities/conversation";

class ConversationUsecase implements IConversationUsecase {
  private conversationRepository: IConversationRepository;
  private queuePublisher: QueuePublisher;
  constructor(
    conversationRepository: IConversationRepository,
    queuePublisher: QueuePublisher
  ) {
    this.conversationRepository = conversationRepository;
    this.queuePublisher = queuePublisher;
  }

  public async create(recieverId: string, senderId: string) {
    try {
      const convoExist = await this.conversationRepository.find(
        recieverId,
        senderId
      );
      if (convoExist) {
        throw new Error("Already Exist");
      }
      const convo = await this.conversationRepository.create(
        recieverId,
        senderId
      );
      return convo;
    } catch (error) {
      throw error;
    }
  }

  public async find(id: string) {
    try {
      const convo=await this.conversationRepository.getConversation(id)
      return convo;
    } catch (error) {
      throw error;
    }
  }
}

export default ConversationUsecase;
