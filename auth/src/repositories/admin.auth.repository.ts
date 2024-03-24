import IAdminAuthRepository from "../interfaces/repository/admin.auth.repository";
import adminAuthModel from "../frameworks/models/admin.subs.model";
import { ICreateSubscriptionRequest } from "../interfaces/admin.auth.interface";

class AdminAuthRepository implements IAdminAuthRepository {
  constructor() {}

  public async login(email: string, password: string): Promise<any> {
      
      if (email != "admin@gmail.com") {
        throw new Error("You not authorized to access!");
      }

      if (password != "admin@123") {
        throw new Error("Invalid password");
      }

      const admin = {
        email : email,
        password : password,
      }
      
      return admin;
  }

  public async createSubscription(data : ICreateSubscriptionRequest) : Promise<any> {
    try {
      const admin = new adminAuthModel({
        type : data.name,
        name:data.name,
        amount: data.amount,
        features: data.features,
        description: data.description,
      });
      await admin.save();

    console.log(data);
      return admin;
    } catch (error) {
      throw error;
    }
  }

  public async getPlanDetails() : Promise<any> {
    try {
      const admin = await adminAuthModel.find({});

      return admin
    } catch (error) {
      throw error;
    }
  }

}
export default AdminAuthRepository;
