import IConversationRepository from "../interfaces/repository/conversation.repository";
// import { IAuth } from "../entities/conversation";
import ConversationModal from "../frameworks/models/conversation.modal";
import UserModel from "../frameworks/models/user.modal";

class ConverationRepository implements IConversationRepository {
  constructor() {}

  public async create(recieveId: string, senderId: string): Promise<any> {
    try {
      await UserModel
      const convo = await ConversationModal.create({
        members: [senderId, recieveId],
      });
      return convo;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async find(recieveId: string, senderId: string): Promise<any> {
    try {
      const convo = await ConversationModal.findOne({
        members: [senderId, recieveId],
      });
      return convo;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async getConversation(id: string): Promise<any> {
    try {
      const convo = await ConversationModal.find({ members: { $in: [id] } }).populate("members").sort({updatedAt:-1});
      return convo;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
export default ConverationRepository;
