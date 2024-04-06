import IAuthRepository from "../interfaces/repository/auth.repository";
import authModel from "../frameworks/models/auth.model";
import { IAuth } from "../entities/auth";
import bcryptjs from "bcryptjs";

class AuthRepository implements IAuthRepository {
  constructor() {}

  public async create(data: IAuth): Promise<IAuth | null> {
    try {
      console.log("from mogono");
      let hashPassword;
      if (data.password) {
        hashPassword = bcryptjs.hashSync(data.password!, 10);
      }
      const user = new authModel({
        fullname: data.fullname,
        username: data.username,
        email: data.email,
        password: hashPassword,
        role: data.role,
      });
      await user.save();
      return user;
    } catch (error) {
      console.log(error);
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

  public async ListUsers(): Promise<unknown> {
    try {
      const user = await authModel.find({ role: "candidate" });

      return user;
    } catch (error) {
      throw error;
    }
  }

  public async blockEmployer(id: string): Promise<void> {
    try {
      const block = await authModel.findOne(
        { _id: id },
        { isBlock: 1, _id: 0 }
      );

      if (!block) {
        throw new Error("Document not found with the provided ID.");
      }
      const updatedIsBlock = !block.isBlock;
      const user = await authModel.updateOne(
        { _id: id },
        { isBlock: updatedIsBlock }
      );

    } catch (error) {
      throw error;
    }
  }

  public async ListEmployers(): Promise<unknown> {
    try {
      const user = await authModel.find({ role: "employer" });

      return user;
    } catch (error) {
      throw error;
    }
  }

  public async blockUser(id: string): Promise<void> {
    try {
      const block = await authModel.findOne(
        { _id: id },
        { isBlock: 1, _id: 0 }
      );

      if (!block) {
        throw new Error("Document not found with the provided ID.");
      }
      const updatedIsBlock = !block.isBlock;
      const user = await authModel.updateOne(
        { _id: id },
        { isBlock: updatedIsBlock }
      );

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
      // if (!isPasswordMatched) {
      //   throw new Error("password doesn't matched");
      // }

      return isPasswordMatched;
    } catch (error) {
      throw error;
    }
  }

  public async update(email: string, npassword: string) {
    try {
      const hashPassword = bcryptjs.hashSync(npassword, 10);
      const user = await authModel.findOneAndUpdate(
        { email: email },
        { $set: { password: hashPassword } },
        { new: true }
      );

      return user;
    } catch (error) {
      throw error;
    }
  }
}
export default AuthRepository;
