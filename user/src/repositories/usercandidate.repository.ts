import IEmployerRepository from "../interfaces/repositories/usercandidte.repositories";

class EmployerRepository implements IEmployerRepository {
  constructor() {}

  public async Profile(data: any): Promise<any> {
      console.log(data);
  }

}
export default EmployerRepository;
