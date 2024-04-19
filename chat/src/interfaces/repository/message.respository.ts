import {} from "../../entities/conversation";
import Message from "../message.interface";

interface IMessageRepository {
  create(message : Message): Promise<any>;
  getConversation(id : string): Promise<any>;
}

export default IMessageRepository;
