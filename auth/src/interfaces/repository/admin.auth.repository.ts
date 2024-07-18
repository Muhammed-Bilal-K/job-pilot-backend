import { Iadmin } from "../../entities/auth";
import { ICreateSubscriptionRequest } from "../admin.auth.interface";

interface IAdminAuthRepository {
  login(email: string, password: string): Promise<Iadmin>;
  createSubscription(data : ICreateSubscriptionRequest) : Promise<any>;
  getPlanDetails():Promise<any>;
  editSubscription(id : string , planData : any) : Promise<void>;
  deleteSubscription(id : string) : Promise<void>;
  deleteUser(id : string) : Promise<void>;
  verifyUser(id : string) : Promise<void>;
  deniedUser(id : string) : Promise<void>;
}

export default IAdminAuthRepository;
