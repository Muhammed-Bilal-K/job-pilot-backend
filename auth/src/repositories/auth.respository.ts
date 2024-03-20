import IAuthRepository from "../interfaces/repository/auth.respository";
import authModel from "../frameworks/models/auth.model";
import IAuth from '../entities/auth';
import bcryptjs from "bcryptjs";

class AuthRepository implements IAuthRepository {
  constructor() {}

  public async create(data : IAuth) : Promise<IAuth | null> {
    try {
      console.log('from mogono');
      const hashPassword = bcryptjs.hashSync(data.password!, 10);
      const user = new authModel({
        fullname:data.fullname,
        username: data.username,
        email: data.email,
        password: hashPassword,
        role:data.role,
      });
      await user.save();
      console.log('from saved mogondb');
      
      return user;
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
      if (!isPasswordMatched) {
        throw new Error("password doesn't matched");
      }
      
      return isPasswordMatched;
    } catch (error) {
      throw error;
    }
  }

  public async update(email : string , npassword : string){
    try {
      const hashPassword = bcryptjs.hashSync(npassword, 10);
      const user = await authModel.findOneAndUpdate(
            { email: email },
            { $set: { password: hashPassword } },
            { new: true }
        );
        
        return user;
    } catch (error) {
      throw error
    }
  }

}
export default AuthRepository;
