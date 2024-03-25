import {
    IJobCreateRequest,
  } from "../interfaces/job.interface";
import IJobRepository from "../interfaces/repositories/job.repositories";
import IJobUsecase from "../interfaces/usecase/job.usecase";

class JobUsecase implements IJobUsecase {
    private jobRepository : IJobRepository; 
    constructor(
        jobRepository : IJobRepository, 
    ){
        this.jobRepository = jobRepository;
    }

    public async jobCreate(employerJobData : IJobCreateRequest){     
        try {
            const job = await this.jobRepository.jobCreateData(employerJobData);

            return job;
        } catch (error) {
            throw error
        }
    }

    public async jobList(){     
        try {
            const job = await this.jobRepository.listJobData();

            return job;
        } catch (error) {
            throw error
        }
    }


}

export default JobUsecase;









