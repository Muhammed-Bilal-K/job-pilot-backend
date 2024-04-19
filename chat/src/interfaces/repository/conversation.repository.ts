import {} from "../../entities/conversation";

interface IConversationRepository {
  create(recieverId : string , senderId : string): Promise<any>;
  find(recieverId : string , senderId : string): Promise<any>;
  getConversation(id : string): Promise<any>;
}

export default IConversationRepository;
