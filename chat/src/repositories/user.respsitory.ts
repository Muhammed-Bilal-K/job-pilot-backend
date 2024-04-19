import { IUser } from "../entities/user";
import IUserRepository from "../interfaces/repository/user.respository";
import UserModel from "../frameworks/models/user.modal";

class CompanyRepository implements IUserRepository{
  constructor(){}

    public async create(data: IUser): Promise<unknown> {
      try {
          const user = new UserModel({
            _id: data._id,
            username : data.name,
            email : data.email,
          });
          await user.save();
          return user;
      } catch (error) {
        throw error;
      }
    }   
}

export default CompanyRepository