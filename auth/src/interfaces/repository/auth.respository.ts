import IAuth from "../../entities/auth";

interface IAuthRepository {
  findByEmail(email: string): Promise<IAuth | null>;
  findByEmailAndComparePassword(
    email: string,
    password: string
  ): Promise<boolean>;
  create(data: IAuth): Promise<IAuth | null>;
}

export default IAuthRepository;
