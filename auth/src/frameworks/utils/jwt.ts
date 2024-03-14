import { Secret } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { IActivationRequest, IRegisterRequest } from "../../interfaces/auth.interface";
import IAuth from '../../entities/auth';

class JwtService {
  constructor() {}

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
