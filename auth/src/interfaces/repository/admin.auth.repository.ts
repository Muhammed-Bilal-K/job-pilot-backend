import { ICreateSubscriptionRequest } from "../admin.auth.interface";

interface IAdminAuthRepository {
  login(email: string, password: string): Promise<any>;
  createSubscription(data : ICreateSubscriptionRequest) : Promise<any>;
  getPlanDetails():Promise<any>;
  editSubscription(id : any , planData : any) : Promise<void>;
}

export default IAdminAuthRepository;
