import {
  IRegisterRequest,
  ILoginRequest,
  IActivationRequest,
} from "../auth.interface";

interface IAuthUsecase {
  login(data: ILoginRequest): Promise<any>;
  register(userData: IRegisterRequest): Promise<string>;
  activateUser(data: IActivationRequest): Promise<void>;
}

export default IAuthUsecase;
