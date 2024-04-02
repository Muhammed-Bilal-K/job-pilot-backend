import IAuth from "../../entities/auth";

export interface IAuthRepository {
  createUser: (data:IAuth) => Promise<unknown>;
}
