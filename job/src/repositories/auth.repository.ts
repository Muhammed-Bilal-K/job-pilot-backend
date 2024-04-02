import IAuth from "../entities/auth";
import { IAuthRepository }from "../interfaces/repositories/user.repository";
import AuthModel from "../frameworks/models/auth.model";

class AuthRepository implements IAuthRepository{
  constructor(){}

    public async createUser(data: IAuth): Promise<unknown> {
      try {
        if (data.role === 'candidate') { 
          const user = new AuthModel({
            id : data._id,
            name : data.name,
            username:data.username,
            email : data.email,
            role : data.role
          });
          await user.save();
          return user;
        }else{
          console.log('not candidate');
        }
      } catch (error) {
        throw error;
      }
    }   
}

export default AuthRepository