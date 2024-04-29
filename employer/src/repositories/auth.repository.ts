import IAuth from "../entities/auth";
import { IAuthRepository }from "../interfaces/repositories/user.repository";
import AuthModel from "../frameworks/models/auth.model";
import { Role } from "../enums/employer";

class AuthRepository implements IAuthRepository{
  constructor(){}

    public async createUser(data: IAuth): Promise<unknown> {
      try {
        if (data.role === Role.EMPLOYER) { 
          const user = new AuthModel({
            _id : data._id,
            name : data.name,
            username : data.username,
            email : data.email,
            role : data.role
          });
          await user.save();
          return user;
        }else{
          console.log('not employer');
        }
      } catch (error) {
        throw error;
      }
    }   
}

export default AuthRepository