// import { IAuth } from "../../entities/conversation";
import {
  IRegisterRequest,
  ILoginRequest,
  IActivationRequest,
  IRequestEmail,
  InputPass,
  IResendOtp
} from "../conversation.interface";

interface IConversationUsecase {
  create(recieverId : string , senderId : string): Promise<any>;
  find(userId : string): Promise<any>;
}

export default IConversationUsecase;
