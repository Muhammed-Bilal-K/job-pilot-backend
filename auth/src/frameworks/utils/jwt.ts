import { Secret } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { IActivationRequest, IRegisterRequest } from "../../interfaces/auth.interface";
import IAuth from '../../entities/auth';

class JwtService {
  constructor() {}

  async createToken(
    user: IAuth
  ): Promise<{ token: string; expires: Date; user: IAuth }> {
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.ACTIVE_SECRET! as Secret,
      {
        expiresIn: "3d",
      }
    );

    // // store user details in redis
    // const userString = JSON.stringify(user); // Convert the object to a string
    // // Set refresh token in Redis with an expiration time
    // redis.set(user._id.toString(), userString, "EX", 3 * 24 * 60 * 60); // Expires in 3 days

    const oneHourInMillis = 7 * 24 * 60 * 60 * 1000; // 1 hour in milliseconds
    const expirationDate = new Date(Date.now() + oneHourInMillis);
    return { token, expires: expirationDate, user };
  }

  async createActivationCode(
    user: IRegisterRequest,
    activationCode: string
  ): Promise<{ token: string }> {
    const token = jwt.sign(
      {
        user,
        activationCode,
      },
      process.env.ACTIVE_SECRET! as Secret,
      {
        expiresIn: "10m",
      }
    );
    return { token };
  }

  async verifyActivationCode(
    data: IActivationRequest
  ): Promise<{ user: IAuth; activationCode: string }> {
    const user = jwt.verify(
      data.activation_token,
      process.env.ACTIVE_SECRET as string
    );
    return user as { user: IAuth; activationCode: string };
  }

}

export default JwtService;
