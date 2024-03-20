import Auth from "../../entities/auth";
import {
  IRegisterRequest,
  ILoginRequest,
  IActivationRequest,
  IRequestEmail,
  InputPass,
  IResendOtp
} from "../auth.interface";

interface IAuthUsecase {
  login(data: ILoginRequest): Promise<any>;
  register(userData: IRegisterRequest): Promise<any>;
  activateUser(data: IActivationRequest): Promise<void>;
  UserByEmail(data : IRequestEmail) : Promise<Auth>;
  UpdatePassByEmail(data : InputPass) : Promise<any>;
  ResendUserOtp(data : IResendOtp) : Promise<string>;
}

export default IAuthUsecase;
