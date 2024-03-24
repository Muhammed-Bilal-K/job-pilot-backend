import { IJobCreateRequest, IRegisterRequest } from "../interfaces/employer.interface";
import IEmployerRepository from "../interfaces/repositories/employer.repositories";
// import bcryptjs from "bcryptjs";

class EmployerRepository implements IEmployerRepository {
  constructor() {}

  public async jobCreateData(data: IJobCreateRequest): Promise<any> {
      console.log(data);
      
  }
  

}
export default EmployerRepository;
