import { IJobCreateRequest } from "../job.interface";

interface IJobUsecase {
    jobCreate(data: IJobCreateRequest): Promise<any>;
    jobList() : Promise<any>;
  }
  
  export default IJobUsecase;