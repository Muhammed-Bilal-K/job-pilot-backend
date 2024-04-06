import { IAuth } from "../../entities/auth";

interface IAuthRepository {
  findByEmail(email: string): Promise<IAuth | null>;
  findByEmailAndComparePassword(
    email: string,
    password: string
  ): Promise<boolean>;
  create(data: IAuth): Promise<any>;
  update(email: string, npassword:string) : Promise<any>;
  ListUsers():Promise<unknown>;
  ListEmployers():Promise<unknown>;
  blockUser(id : string):Promise<void>;
  blockEmployer(id : string):Promise<void>;
}

export default IAuthRepository;
