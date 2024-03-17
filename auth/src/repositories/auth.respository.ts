import IAuthRepository from "../interfaces/repository/auth.respository";
import authModel from "../frameworks/models/auth.model";
import IAuth from '../entities/auth';
import bcryptjs from "bcryptjs";

class AuthRepository implements IAuthRepository {
  constructor() {}

  public async create(data : IAuth) : Promise<IAuth | null> {
    try {
      console.log(data, 'from mogono');
      
      const user = new authModel({
        fullname:data.fullname,
        username: data.username,
        email: data.email,
        password: data.password,
        role:data.role,
      });
      await user.save();
      console.log(user,'from mogondb');
      
      return user;
      // return null;
    } catch (error) {
      throw error;
    }
  }

  public async findByEmail(email: string): Promise<IAuth | null> {
    try {
      const user = await authModel.findOne({ email });

      return user;
    } catch (error) {
      throw error;
    }
  }

  public async findByEmailAndComparePassword(email: string, password: string) {
    try {
      const user = await authModel.findOne({ email });
      if (!user) {
        throw new Error("IUser not found");
      }
      const isPasswordMatched = bcryptjs.compareSync(password, user.password);
      return isPasswordMatched;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

}
export default AuthRepository;
