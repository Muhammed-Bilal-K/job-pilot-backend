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
  UserByEmail(data : IRequestEmail) : Promise<IAuth>;
  UpdatePassByEmail(data : InputPass) : Promise<any>;
  ResendUserOtp(data : IResendOtp) : Promise<string>;
  CurrentUserData(token : string | undefined) : Promise<IAuth>;
  ListUsers() : Promise<unknown>;
  ListEmployers() : Promise<unknown>;
  blockUser(id : string) : Promise<void>;
  blockEmployer(id : string) : Promise<void>;
}

export default IAuthUsecase;
