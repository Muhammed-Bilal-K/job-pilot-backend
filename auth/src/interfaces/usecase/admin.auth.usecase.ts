import { IAdminLoginRequest, ICreateSubscriptionRequest } from "../admin.auth.interface";


interface IAdminAuthUsecase {
    login(data: IAdminLoginRequest): Promise<any>;
    createSubcriptionPlan(data : ICreateSubscriptionRequest) : Promise<void>;
    deleteSubcriptionPlan(id : string) : Promise<void>;
    deleteUser(id : string) : Promise<void>;
    getPlanDetails():Promise<any>;
    editSubscription(id : any , planData : any) : Promise<void>;
    DoneVerify(id : string) : Promise<void>;
    DeniedVerify(id : string) : Promise<void>;
    
}

export default IAdminAuthUsecase;