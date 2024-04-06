import { ICreateSubscriptionRequest } from "../admin.auth.interface";

interface IAdminAuthRepository {
  login(email: string, password: string): Promise<any>;
  createSubscription(data : ICreateSubscriptionRequest) : Promise<any>;
  getPlanDetails():Promise<any>;
  editSubscription(id : any , planData : any) : Promise<void>;
  deleteSubscription(id : string) : Promise<void>;
  deleteUser(id : string) : Promise<void>;
  VerifyUser(id : string) : Promise<void>;
  DeniedUser(id : string) : Promise<void>;
}

export default IAdminAuthRepository;
