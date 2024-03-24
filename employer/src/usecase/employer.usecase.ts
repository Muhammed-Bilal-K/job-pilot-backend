import {
    IJobCreateRequest,
  } from "../interfaces/employer.interface";
import IEmpoloyerRepository from "../interfaces/repositories/employer.repositories";
import IEmployerUsecase from "../interfaces/usecase/employer.usecase";

class EmployerUsecase implements IEmployerUsecase {
    private employerRepository : IEmpoloyerRepository; 
    constructor(
        employerRepository : IEmpoloyerRepository, 
    ){
        this.employerRepository = employerRepository;
    }

    public async jobCreate(employerJobData : IJobCreateRequest){     
        const employer = await this.employerRepository.jobCreateData(employerJobData);
    }


}

export default EmployerUsecase;









