import IUserRepository from "../interfaces/repositories/usercandidte.repositories";
import IUserUsecase from "../interfaces/usecase/usercandidate.usecase";

class UserUsecase implements IUserUsecase {
    private userRepository : IUserRepository; 
    constructor(
        employerRepository : IUserRepository, 
    ){
        this.userRepository = employerRepository;
    }

    public async Profile(data : any){     
        const user = await this.userRepository.Profile(data);
    }

    public async specificUser(id: string) {
        try {
          const job = await this.userRepository.specificUser(id);
    
          return job;
        } catch (error) {
          throw error;
        }
      }
}

export default UserUsecase;









