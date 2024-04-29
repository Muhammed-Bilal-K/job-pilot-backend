import { IAuth } from "../../entities/auth";
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
  socialAuth(data: IAuth): Promise<any>;
  activateUser(data: IActivationRequest): Promise<void>;
  userByEmail(data : IRequestEmail) : Promise<IAuth>;
  updatePassByEmail(data : InputPass) : Promise<any>;
  resendUserOtp(data : IResendOtp) : Promise<string>;
  currentUserData(token : string | undefined) : Promise<IAuth>;
  listUsers() : Promise<unknown>;
  listEmployers() : Promise<unknown>;
  blockUser(id : string) : Promise<void>;
  blockEmployer(id : string) : Promise<void>;
}

export default IAuthUsecase;
