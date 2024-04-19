import { IUser } from "../../entities/user";

interface IUserRepository {
    create(data : IUser): Promise<any>;
  }
  
export default IUserRepository;