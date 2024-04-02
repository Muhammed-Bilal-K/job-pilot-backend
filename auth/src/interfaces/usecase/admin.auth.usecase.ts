import { IAdminLoginRequest, ICreateSubscriptionRequest } from "../admin.auth.interface";


interface IAdminAuthUsecase {
    login(data: IAdminLoginRequest): Promise<any>;
    createSubcriptionPlan(data : ICreateSubscriptionRequest) : Promise<void>;
    getPlanDetails():Promise<any>;
    editSubscription(id : any , planData : any) : Promise<void>;
    
}

export default IAdminAuthUsecase;