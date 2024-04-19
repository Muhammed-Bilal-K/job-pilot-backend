import IMessageRepository from "../interfaces/repository/message.respository";
import MessageModel from "../frameworks/models/message.modal";
import Message from "../interfaces/message.interface";

class ConverationRepository implements IMessageRepository {
  constructor() {}

  public async create(message: Message): Promise<any> {
    try {
      const convo = await MessageModel.create(message);
      return convo;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async getConversation(id: string): Promise<any> {
    try {
      const convo = await MessageModel.find({ conversationId: id });
      return convo;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
export default ConverationRepository;