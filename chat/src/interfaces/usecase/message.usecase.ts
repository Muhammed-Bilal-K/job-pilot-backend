import Message from "../message.interface";
  
  interface IMessageUsecase {
    create(message : Message): Promise<any>;
    getConvo(id : string): Promise<any>;
  }
  
  export default IMessageUsecase;