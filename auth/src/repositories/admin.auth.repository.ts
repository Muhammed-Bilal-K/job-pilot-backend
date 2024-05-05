import IAdminAuthRepository from "../interfaces/repository/admin.auth.repository";
import adminAuthModel from "../frameworks/models/admin.subs.model";
import { ICreateSubscriptionRequest } from "../interfaces/admin.auth.interface";
import AuthModel from "../frameworks/models/auth.model";

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
      email: email,
      password: password,
    };

    return admin;
  }

  public async editSubscription(id: string, data: any): Promise<any> {
    try {
      const subscription = await adminAuthModel.findByIdAndUpdate(
        id,
        {
          type: data.name,
          name: data.name,
          amount: data.amount,
          features: data.features,
          description: data.description,
        },
        { new: true }
      );

      if (!subscription) {
        throw new Error("Subscription not found");
      }

      return subscription;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async createSubscription(
    data: ICreateSubscriptionRequest
  ): Promise<any> {
    try {
      const admin = new adminAuthModel({
        type: data.name,
        name: data.name,
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

  public async deleteSubscription(id: string): Promise<void> {
    try {
      const deletionResult = await adminAuthModel.deleteOne({ _id: id });

      console.log(deletionResult);
    } catch (error) {
      throw error;
    }
  }

  public async deleteUser(id: string): Promise<void> {
    try {
      const deletionResult = await AuthModel.deleteOne({ _id: id });
    } catch (error) {
      throw error;
    }
  }

  public async verifyUser(id: string): Promise<void> {
    try {
      const deletionResult = await AuthModel.updateOne(
        { _id: id },
        {
          isVerify: 1,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  public async deniedUser(id: string): Promise<void> {
    try {
      const deletionResult = await AuthModel.updateOne(
        { _id: id },
        {
          isVerify: -1,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  public async getPlanDetails(): Promise<any> {
    try {
      const admin = await adminAuthModel.find({});

      return admin;
    } catch (error) {
      throw error;
    }
  }
}
export default AdminAuthRepository;
