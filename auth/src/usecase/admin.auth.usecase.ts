import { Iadmin } from "../entities/auth";
import JwtService from "../frameworks/utils/jwt";
import { IAdminLoginRequest, ICreateSubscriptionRequest } from "../interfaces/admin.auth.interface";
import IAdminAuthRepository from "../interfaces/repository/admin.auth.repository";
import IAdminAuthUsecase from "../interfaces/usecase/admin.auth.usecase";

class AdminAuthUsecase implements IAdminAuthUsecase {
  private adminAuthRepository: IAdminAuthRepository;
  private jwt: JwtService;
  constructor(adminAuthRepository: IAdminAuthRepository, jwt: JwtService) {
    this.adminAuthRepository = adminAuthRepository;
    this.jwt = jwt;
  }
  public async login(data: IAdminLoginRequest) {
    try {
      const admin = await this.adminAuthRepository.login(data.email , data.password);

      const token = await this.jwt.adminCreateToken(admin);
      return token;
    } catch (error) {
      throw error;
    }
  }

  public async createSubcriptionPlan(data : ICreateSubscriptionRequest) {
    try {
      const { name , amount , description , features } = data;

      const admin = await this.createPlan({
        name,
        amount,
        description,
        features
      })
    } catch (error) {
      throw error;
    }
  }

  public async editSubscription(id : any , planData : any) {
    try {
      const adminplan = this.adminAuthRepository.editSubscription(id , planData);

      return adminplan;
    } catch (error) {
      throw error;
    }
  }

  public async createPlan(data : ICreateSubscriptionRequest){
    try {
      const admin = await this.adminAuthRepository.createSubscription(data);

      return admin;
    } catch (error) {
      throw error
    }  
  }

  public async deleteSubcriptionPlan(id : string){
    try {
      const admin = await this.adminAuthRepository.deleteSubscription(id);

      return admin;
    } catch (error) {
      throw error
    }  
  }

  public async deleteUser(id : string){
    try {
      const admin = await this.adminAuthRepository.deleteUser(id);

      return admin;
    } catch (error) {
      throw error
    }  
  }
  
  public async doneVerify(id : string){
    try {
      const admin = await this.adminAuthRepository.verifyUser(id);

      return admin;
    } catch (error) {
      throw error
    }  
  }

  public async deniedVerify(id : string){
    try {
      const admin = await this.adminAuthRepository.deniedUser(id);

      return admin;
    } catch (error) {
      throw error
    }  
  }

  public async getPlanDetails(){
    try {
      const admin = await this.adminAuthRepository.getPlanDetails();

      return admin;
    } catch (error) {
      throw error
    }  
  }

}

export default AdminAuthUsecase;
