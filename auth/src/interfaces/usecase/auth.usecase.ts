import Auth from "../../entities/auth";
import {
  IRegisterRequest,
  ILoginRequest,
  IActivationRequest,
  IRequestEmail,
  InputPass
} from "../auth.interface";

interface IAuthUsecase {
  login(data: ILoginRequest): Promise<any>;
  register(userData: IRegisterRequest): Promise<string>;
  activateUser(data: IActivationRequest): Promise<void>;
  UserByEmail(data : IRequestEmail) : Promise<Auth>;
  UpdatePassByEmail(data : InputPass) : Promise<any>;
}

export default IAuthUsecase;
